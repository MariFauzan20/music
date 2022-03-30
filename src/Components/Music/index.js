import React from "react";

export default function Music({ id, urlImg, title, artist, album }) {
  return (
    <div key={id} className="col col-lg-3 col-md-4 col-sm-12 my-3">
      <div className="card p-3" style={{ maxWidth: 300, maxHeight: 600 }}>
        <img className="card-img-top" src={urlImg} alt="" />
        <h5 className="fs-5">{title}</h5>
        <h6 className="fw-normal">{artist}</h6>
        <p className="fw-light text-reset">{album}</p>
        <button className="btn btn-primary" id="select">
          Select
        </button>
      </div>
    </div>
  );
}
