import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylist, getPlaylistInfo } from "../api/youtube";
import { usePlayer } from "../context/PlayerContext";

const Playlist = ({ user }) => {
  const { id } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [songs, setSongs] = useState([]);
  const { currentSong, setCurrentSong } = usePlayer();

  // ✅ Helper to play a song
  const playSong = (song) => {
    if (!song) return;
    setCurrentSong(song);
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) return; // prevent undefined call

      try {
        const info = await getPlaylistInfo(id);
        setPlaylistInfo(info);

        const items = await getPlaylist(id);
        setSongs(items.filter((song) => song?.thumbnail));
      } catch (err) {
        console.error("Failed to fetch playlist:", err);
      }
    };
    fetchPlaylist();
  }, [id]);

  return (
    <div className="flex-1 bg-[#181818] rounded-lg p-6 flex flex-col overflow-hidden">
      {/* Playlist Info */}
      {playlistInfo && (
        <div className="flex items-center justify-between flex-shrink-0 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-md overflow-hidden">
              <img
                src={playlistInfo.thumbnail || "/fallback-album.png"}
                alt={playlistInfo.title || "Playlist Cover"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-2xl font-bold">
                {playlistInfo.title}
              </h2>
              <p className="text-[#b3b3b3] text-sm">
                {playlistInfo.channelTitle || "Unknown Creator"}
              </p>
            </div>
          </div>

          {/* Play All Button */}
          <button
            onClick={() => playSong(songs[0])}
            className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
          >
            <FaPlay /> Play All
          </button>
        </div>
      )}

      {/* Scrollable Songs */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
        {songs.length ? (
          songs.map((song) => (
            <div
              key={song.videoId}
              className="flex items-center gap-4 bg-[#242424] p-3 rounded-lg hover:bg-[#2a2a2a] transition-all cursor-pointer"
              onClick={() => playSong(song)}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden relative">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-1 right-1 bg-[#1db954] hover:bg-[#1ed760] p-2 rounded-full transition-all duration-300">
                  <FaPlay size={14} />
                </button>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-white font-semibold text-sm">
                  {song.title}
                </h3>
                <p className="text-[#b3b3b3] text-xs truncate">
                  {song.channelTitle || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No songs in this playlist.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
