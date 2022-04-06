import React, { useState } from "react";
import { addTracksToPlaylist, createPlaylist } from "../../handler/api";
import { useSelector } from "react-redux";

export default function FormPlaylist({ selectedTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
        name: form.title,
        description: form.description,
      });

      await addTracksToPlaylist(
        accessToken,
        responseCreatePlaylist.id,
        selectedTracks
      );

      console.log("Playlist created successfully");

      setForm({ title: "", description: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="fs-5 mb-3">Create Playlist</h1>
      <form
        className="d-flex flex-column justify-content-center align-items-start"
        onSubmit={handleFormSubmit}
      >
        <input
          className="mb-3"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={handleInputChange}
          value={form.title}
        />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          className="mb-5"
          placeholder="Description"
          onChange={handleInputChange}
          value={form.description}
        />
        <button className="btn btn-success">Create</button>
      </form>
    </>
  );
}
