import React, { useState } from "react";

export default function FormPlaylist() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [errorForm, setErrorForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 5) {
      setErrorForm({
        ...errorForm,
        title: "Title must be at least 5 characters long",
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: "Description must be at least 10 characters long",
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // const responseCreatePlaylist = await createPlaylist(
        //   accessToken,
        //   userId,
        //   {
        //     name: form.title,
        //     description: form.description,
        //   }
        // );

        // await addTracksToPlaylist(
        //   accessToken,
        //   responseCreatePlaylist.id,
        //   uriTracks
        // );

        console.log("Playlist created successfully");

        setForm({ title: "", description: "" });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="create-playlist-form">
      <div>
        <h2>Create Playlist</h2>

        <form className="form form-playlist" onSubmit={handleSubmit}>
          <input
            label="Title"
            placeholder="Title of playlist"
            value={form.title}
            id="title-playlist"
            name="title"
            onChange={handleChange}
            error={errorForm.title}
            required
          />

          <input
            type="textarea"
            label="Description"
            placeholder="Description of playlist"
            value={form.description}
            id="description-playlist"
            name="description"
            onChange={handleChange}
            required
            error={errorForm.description}
          />

          <div className="form-playlist__action">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
