import React, { useEffect } from "react";
import { getLinkAuthorize } from "../handler/api";
import { getUserProfile } from "../handler/api";
import { login } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);

  // Get Access Token
  useEffect(() => {
    const token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (token !== null) {
      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(token);
          const data = JSON.stringify(response);

          dispatch(
            login({
              accessToken: token,
              user: data,
            })
          );
          sessionStorage.setItem("user", data);
          sessionStorage.setItem("token", token);
          window.location.hash = "";
        } catch (error) {
          console.error(error.message);
        }
      };

      setUserProfile();
    }
  }, []);

  return (
    <>
      <a className="btn btn-primary btn-sm" href={getLinkAuthorize()}>
        Login to Spotify
      </a>
      {isAuthorize && <Navigate to="/home" />}
    </>
  );
}
