import React, { useEffect } from "react";
import { getLinkAuthorize } from "../handler/api";
import { getUserProfile } from "../handler/api";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  //   const isAuthorize = useSelector((state) => state.auth.isAuthorize);

  // Get Access Token
  useEffect(() => {
    const token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (token !== null) {
      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(token);

          dispatch(
            login({
              accessToken: token,
              user: response,
            })
          );
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
      {/* {isAuthorize && <Navigate to="/" />} */}
    </>
  );
}
