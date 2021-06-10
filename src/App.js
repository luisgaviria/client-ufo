import React from "react";
import Map from "../src/components/Map.js";
import AppBar from "./components/AppBar.js";
import Header from "./components/Header.js";

export default function App() {
  return (
    <>
      <Header />
      <AppBar />
      <Map />
    </>
  );
}
