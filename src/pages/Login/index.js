import React, { useEffect } from "react";
import { getLinkAuthorize } from "../../handler/api";
import { getUserProfile } from "../../handler/api";
import { login } from "../../features/authSlice";
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
  }, [dispatch]);

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(
          "https://images.unsplash.com/photo-1649293813833-ac6820c63d3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
        )`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row border border-light border-2 rounded-3">
        <div className="col col-9 p-0 m-0">
          <img
            className="w-100 rounded-start"
            src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=813&q=80"
            alt=""
          />
        </div>
        <div className="col col-3 bg-dark">
          <div className="row align-items-center justify-content-center h-100">
            <a
              className="btn btn-warning btn-sm w-50 "
              href={getLinkAuthorize()}
            >
              Login to Spotify
            </a>
          </div>
        </div>
      </div>
      {isAuthorize && <Navigate to="/home" />}
    </div>
  );
}
