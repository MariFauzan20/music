import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FormCreatePlaylist from "./pages/FormCreatePlaylist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-playlist" element={<FormCreatePlaylist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
