import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePlaylist from "./Pages/CreatePlaylist";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";

function App() {
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthorize ? (
          <>
            <Route path="/" element={<Home />}>
              <Route path="create-playlist" element={<CreatePlaylist />} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
