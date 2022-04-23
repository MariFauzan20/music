import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from "../../handler/api";
import Sidebar from "../../parts/Sidebar";

export default function FormCreatePlaylist() {
  const selectedTracks = useSelector((state) => state.selectedTracks.tracks);
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
      <div className="d-flex bg-bg-secondary">
        <Sidebar />
        <div className="container m-3">
          <div className="row mb-4">
            <div className="col d-flex">
              <div>
                <h4 className="fw-bold" style={{ color: "#FF6E4D" }}>
                  Create Playlist
                </h4>
                <p className="fs-6 text-secondary">Add your new playlist</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-7">
              <form
                className="d-flex flex-column justify-content-center align-items-start"
                onSubmit={handleFormSubmit}
              >
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder="Title"
                    onChange={handleInputChange}
                    value={form.title}
                  />
                </div>
                <div className="input-group mb-3">
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Description"
                    onChange={handleInputChange}
                    value={form.description}
                  />
                </div>
                <button className="btn btn-success">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
