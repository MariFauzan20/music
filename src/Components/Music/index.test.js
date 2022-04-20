import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Music from ".";

const renderMusic = (
  <Music
    id="1231j2nkn"
    urlImg="tes"
    title="Beatles"
    artist="daiwhda"
    album="Jude"
  />
);

describe("Music", () => {
  test("Music Image Rendered", () => {
    render(renderMusic);
    const songImage = screen.findByTestId("song-image");
    expect(songImage).toBeInTheDocument;
  });

  test("Music Title Rendered", async () => {
    render(renderMusic);
    const songTitle = screen.findByTestId("song-title");
    expect((await songTitle).textContent).toBe("Beatles");
  });

  test("Music Album Rendered", async () => {
    render(renderMusic);
    const songAlbum = screen.findByTestId("song-album");
    expect((await songAlbum).textContent).toBe("Jude");
  });

  test("Music Button Rendered", async () => {
    render(renderMusic);
    const songButton = screen.findByTestId("song-button");
    expect((await songButton).textContent).toBe("Select");
  });
});
