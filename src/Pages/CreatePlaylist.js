import React from "react";
import { useSelector } from "react-redux";
import FormPlaylist from "../components/FormPlaylist";

export default function CreatePlaylist() {
  const selectedTracks = useSelector((state) => state.selectedTracks.tracks);

  return <FormPlaylist selectedTracks={selectedTracks} />;
}
