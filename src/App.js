import { useEffect, useState } from "react";
import Music from "./Components/Music";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SeacrhBar from "./Components/SearchBar";
import FormPlaylist from "./Components/FormPlaylist";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  // Get Access Token
  useEffect(() => {
    const token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );
    setAccessToken(token);
    setIsAuthorize(token !== null);
  }, []);

  useEffect(() => {
    if (!isSearch) {
      const dataSelectedTracks = filterSelectedTracks();
      setTracks(dataSelectedTracks);
    }
  }, [selectedTracks]);

  // Get Link Authorize
  const getLinkAuthorize = () => {
    const state = Date.now().toString();

    return `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&state=${state}&scope=playlist-modify-private`;
  };

  // Success Search
  const successSearch = (tracks) => {
    setIsSearch(true);
    const dataSelectedTracks = filterSelectedTracks();
    const searchDistinctTracks = tracks.filter(
      (track) => !selectedTracks.includes(track.uri)
    );

    setTracks([...dataSelectedTracks, ...searchDistinctTracks]);
  };

  // Filter Track based on Selected
  const filterSelectedTracks = () => {
    return tracks.filter((track) => selectedTracks.includes(track.uri));
  };

  const clickHandleSelect = (track) => {
    const { uri } = track;

    if (selectedTracks.includes(uri)) {
      setSelectedTracks(selectedTracks.filter((data) => data !== uri));
    } else {
      setSelectedTracks([...selectedTracks, uri]);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col d-flex justify-content-between">
          <h1>Spotify</h1>
          <div className="d-flex flex-column align-items-end">
            {!isAuthorize && (
              <a className="btn btn-primary btn-sm" href={getLinkAuthorize()}>
                Login to Spotify
              </a>
            )}

            {isAuthorize && (
              <div>
                <FormPlaylist />
                <SeacrhBar
                  token={accessToken}
                  successSearch={(tracks) => successSearch(tracks)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {tracks.map((track) => (
          <Music
            key={track.uri}
            urlImg={track.album.images[0].url}
            title={track.name}
            artist={track.album.artists[0].name}
            album={track.album.name}
            clickHandleSelect={() => clickHandleSelect(track)}
          />
        ))}
      </div>
      {/* <div className="row">
        <div className="col">
          <form action="">
            <input type="text" name="title" id="title" placeholder="Title" />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Description"
            />
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default App;
