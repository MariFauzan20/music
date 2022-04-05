import axios from "axios";

export const getUserProfile = async (accessToken) => {
  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `${process.env.REACT_APP_SPOTIFY_BASE_URL}/me`,
    requestOptions
  );

  return response.data;
};

export const createPlaylist = async (
  accessToken,
  userId,
  { name, description }
) => {
  const data = JSON.stringify({
    name,
    description,
    public: false,
    collaborative: false,
  });

  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${process.env.REACT_APP_SPOTIFY_BASE_URL}/users/${userId}/playlists`,
    data,
    requestOptions
  );

  return response.data;
};

export const addTracksToPlaylist = async (accessToken, playlistId, uris) => {
  const data = JSON.stringify({
    uris,
  });

  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${process.env.REACT_APP_SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    data,
    requestOptions
  );
  console.log(response.data);

  return response.data;
};
