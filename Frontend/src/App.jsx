import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/User";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import Playlist from "./Components/Playlist";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { PlayerProvider } from "./context/PlayerContext";

const App = () => {
  const { loading, isAuth, user } = UserData();

  if (loading) return <div>Loading...</div>;

  return (
    <PlayerProvider>
      <BrowserRouter>
        <div className="bg-black min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main layout */}
          <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden gap-3">
            <Sidebar />
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <Routes>
                {/* Default homepage */}
                <Route path="/" element={<Playlist user={user} />} />

                {/* Playlist route with :id */}
                <Route
                  path="/playlist/:id"
                  element={isAuth ? <Playlist user={user} /> : <Login />}
                />

                {/* Auth routes */}
                <Route
                  path="/login"
                  element={isAuth ? <Playlist /> : <Login />}
                />
                <Route
                  path="/register"
                  element={isAuth ? <Playlist /> : <Register />}
                />
              </Routes>
            </div>
          </div>

          {/* Global Player */}
          <Player />
        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
};

export default App;
