import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/User";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Playlist from "./Components/Playlist";
import Album from "./Components/Album";

const App = () => {
  const { loading, isAuth, user } = UserData();

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth-protected */}
        <Route
          path="/playlist"
          element={isAuth ? <Playlist user={user} /> : <Login />}
        />
        <Route
          path="/album/:id"
          element={isAuth ? <Album user={user} /> : <Login />}
        />

        {/* Auth pages */}
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
