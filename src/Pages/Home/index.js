import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Music from "../../components/Music";
import SearchBar from "../../components/SearchBar";
import { selected } from "../../features/selectedTrack";
import Sidebar from "../../parts/Sidebar";
import { Navigate } from "react-router-dom";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const selectedTracks = useSelector((state) => state.selectedTracks.tracks);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!isSearch) {
      const dataSelectedTracks = filterSelectedTracks();
      setTracks(dataSelectedTracks);
    }
  }, []);

  return (
    <>
      {!isAuthorize && <Navigate to={"/"} />}
      <div className="d-flex bg-bg-secondary">
        <Sidebar />
        <div className="container m-3">
          <div className="row mb-4">
            <div className="col d-flex justify-content-between">
              <div>
                <h4 className="fw-bold" style={{ color: "#FF6E4D" }}>
                  Home
                </h4>
                <p className="fs-6 text-secondary">
                  Discover a new music by typing in search
                </p>
              </div>
              <div className="d-flex align-items-start">
                <SearchBar successSearch={(tracks) => successSearch(tracks)} />
              </div>
            </div>
          </div>
          <div className="row">
            {tracks.map((track) => {
              return (
                <Music
                  key={track.uri}
                  urlImg={track.album.images[0].url}
                  title={track.name}
                  artist={track.album.artists[0].name}
                  album={track.album.name}
                  clickHandleSelect={(track) => clickHandleSelect(track)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
