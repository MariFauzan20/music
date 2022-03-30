import axios from "axios";
import { useEffect, useState } from "react";
import Music from "./Components/Music";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchTracks = async (e) => {
    e.preventDefault();

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });

    setTracks(data.tracks.items);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col d-flex justify-content-between">
          <h1>Spotify</h1>
          <div className="d-flex flex-column align-items-end">
            {!token ? (
              <a
                className="btn btn-primary btn-sm"
                href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`}
              >
                Login to Spotify
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            )}
            {token ? (
              <form className="mt-5" onSubmit={searchTracks}>
                <input
                  className="me-1"
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <button className="btn btn-primary btn-sm" type={"submit"}>
                  Search
                </button>
              </form>
            ) : (
              <h2 className="">Please Login First</h2>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {tracks.map((track) => (
          <Music
            key={track.id}
            urlImg={track.album.images[0].url}
            title={track.name}
            artist={track.album.artists[0].name}
            album={track.album.name}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
