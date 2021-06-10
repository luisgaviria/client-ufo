import React from "react";
import panTo from "./Map.js";

import myLocation from "../icons/myLocation.svg";

export default function Locate({ panTo }) {
  return (
    <button>
      <img
        icon={{
          icon: myLocation,
        }}
      />
    </button>
  );
}
