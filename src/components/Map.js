import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import dotenv from "dotenv";

import { formatRelative } from "date-fns";

import ufo from "../icons/ufo-marker.svg";

import Search from "./Search.js";
import Locate from "./Locate.js";
import mapStyles2 from "./mapStyles2.js";

import axios from "axios";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "60vh",
};

const center = {
  lat: 42.361145,
  lng: -71.057083,
};

const options = {
  styles: mapStyles2,
  disableDefaultUI: true,
  zoomControl: true,
};
dotenv.config();
export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback(async (event) => {
    await axios.post(
      "http://localhost:3001/ufo",
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(async (map) => {
    const response = await axios.get("http://localhost:3001/ufo", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const ufos = response.data.ufos;

    ufos.map((ufo) => {
      ufo.time = new Date(ufo.time);
    });
    setMarkers(ufos);
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(8);
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className='map'>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: ufo,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>UFO Seen! </h2>
              <p>Seen {formatRelative(selected.time, new Date())}</p>
              <button
                onClick={async () => {
                  await axios.delete(
                    "http://localhost:3001/ufo/" + selected.id
                  );
                  const response = await axios.get(
                    "http://localhost:3001/ufo",
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const ufos = response.data.ufos;

                  ufos.map((ufo) => {
                    ufo.time = new Date(ufo.time);
                  });
                  setMarkers(ufos);
                }}
              >
                Delete
              </button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
