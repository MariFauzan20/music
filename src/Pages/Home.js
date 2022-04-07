import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Music from "../components/Music";
import SearchBar from "../components/SearchBar";
import { selected } from "../features/selectedTrack";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const selectedTracks = useSelector((state) => state.selectedTracks.tracks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSearch) {
      const dataSelectedTracks = filterSelectedTracks();
      setTracks(dataSelectedTracks);
    }
  }, [selectedTracks]);

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

  // Selected Music
  const clickHandleSelect = (track) => {
    const { uri } = track;

    if (selectedTracks.includes(uri)) {
      dispatch(
        selected({
          tracks: selectedTracks.filter((data) => data !== uri),
        })
      );
    } else {
      dispatch(
        selected({
          tracks: [...selectedTracks, uri],
        })
      );
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col d-flex justify-content-between">
          <h1>Spotify</h1>
          <div className="d-flex align-items-start">
            {isAuthorize && (
              <SearchBar successSearch={(tracks) => successSearch(tracks)} />
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
    </div>
  );
}
