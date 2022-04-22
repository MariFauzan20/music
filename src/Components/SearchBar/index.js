import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import propTypes from "prop-types";

export default function SearchBar({ successSearch }) {
  const [keyword, setKeyword] = useState("");
  const token = useSelector((state) => state.auth.accessToken);

  const handleInputKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleButtonSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SPOTIFY_BASE_URL}/search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: keyword,
            type: "track",
          },
        }
      );
      successSearch(response.data.tracks.items);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  return (
    <form
      onSubmit={(e) => handleButtonSearch(e)}
      className="d-flex align-self-center"
    >
      <div className="input-group me-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => handleInputKeyword(e)}
        />
      </div>
      <button className="btn btn-primary btn-sm" type={"submit"}>
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  successSearch: propTypes.func,
};
