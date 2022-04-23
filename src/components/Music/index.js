import React, { useState } from "react";
import propTypes from "prop-types";
import "./index.css";

export default function Music({
  id,
  urlImg,
  title,
  artist,
  album,
  clickHandleSelect,
}) {
  const [selected, setSelected] = useState(false);

  const clickSelected = () => {
    setSelected(!selected);
    clickHandleSelect();
  };

  return (
    <div key={id} className="col col-lg-12 col-md-12 col-sm-12 my-2">
      <div
        className="card p-3 d-flex flex-row align-items-center rounded-3"
        style={{ maxHeight: 150, backgroundColor: "#f5f5f5" }}
      >
        <img
          className="card-img-top"
          src={urlImg}
          alt=""
          style={{ width: 120 }}
        />
        <div className="col ps-5 text-start">
          <div className="row">
            <span className="text-wrap fw-bold" style={{ fontSize: "0.8em" }}>
              {title}
            </span>
          </div>
          <div className="row">
            <span className="fw-normal text-wrap" style={{ fontSize: "0.8em" }}>
              {artist}
            </span>
          </div>
          <div className="row">
            <span
              className="fw-light text-reset text-wrap"
              style={{ fontSize: "0.8em" }}
            >
              {album}
            </span>
          </div>
          <div className="row mt-3">
            <button
              className={`btn ${
                selected ? "btn-success" : "btn-outline-primary"
              } btn-sm w-25`}
              onClick={clickSelected}
            >
              {`${selected ? "Deselect" : "Select"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Music.propTypes = {
  id: propTypes.string,
  urlImg: propTypes.string,
  title: propTypes.string,
  artist: propTypes.string,
  album: propTypes.string,
  clickHandleSelect: propTypes.func,
};
