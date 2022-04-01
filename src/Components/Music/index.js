import React, { useState } from "react";

export default function Music({ id, urlImg, title, artist, album }) {
  const [select, setSelect] = useState(false);

  const clickSelect = () => {
    setSelect(!select);
    console.log(select);
  };

  return (
    <div key={id} className="col col-lg-3 col-md-4 col-sm-12 my-3">
      <div className="card p-3" style={{ maxWidth: 300, maxHeight: 600 }}>
        <img className="card-img-top" src={urlImg} alt="" />
        <h5 className="fs-5">{title}</h5>
        <h6 className="fw-normal">{artist}</h6>
        <p className="fw-light text-reset">{album}</p>
        <button
          className={`btn ${select ? "btn-success" : "btn-primary"}`}
          onClick={clickSelect}
        >
          {`${select ? "Deselect" : "Select"}`}
        </button>
      </div>
    </div>
  );
}
