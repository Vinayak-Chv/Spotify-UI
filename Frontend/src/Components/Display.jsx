import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getPlaylist, getPlaylistInfo } from "../api/youtube";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

const Display = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [popularPlaylists, setPopularPlaylists] = useState([]);
  const navigate = useNavigate();
  const { playSong } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TRENDING_ID = "RDCLAK5uy_ly0ZHQ7uutQ76YAUjYks4rEG9dOhL9Rfw";
        const PLAYLIST_IDS = [
          "RDCLAK5uy_nmS3YoxSwVVQk9lEQJ0UX4ZCjXsW_psU8",
          "RDCLAK5uy_mjFIQx6np0uEk0EFQnkGFxqR3OMxReYv0",
          "RDCLAK5uy_nLOvZAnN86K4f-fJ6tUi0xHUPBHLBBkVE"
        ];

        const trending = (await getPlaylist(TRENDING_ID)) || [];
        setTrendingSongs(trending.filter(song => song?.thumbnail).slice(0, 10));

        const playlists = [];
        for (let id of PLAYLIST_IDS) {
          const info = await getPlaylistInfo(id);
          if (info && info.thumbnail) playlists.push(info);
        }
        setPopularPlaylists(playlists);
      } catch (err) {
        console.error("Error fetching display data:", err);
      }
    };
    fetchData();
  }, []);

  const renderSongCard = (song) => (
    <div
      key={song.videoId}
      className="relative bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-all group min-w-[160px] snap-start"
      onClick={() => playSong(song)}
    >
      <div className="w-full aspect-square rounded-md overflow-hidden mb-3 relative">
        <img src={song.thumbnail || "/fallback-song.png"} alt={song.title || "Unknown Song"} className="w-full h-full object-cover" />
        <button className="absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
          <FaPlay size={16} />
        </button>
      </div>
      <h3 className="text-white text-sm font-semibold truncate">{song.title || "Unknown Title"}</h3>
      <p className="text-[#b3b3b3] text-xs truncate">{song.channelTitle || "Unknown Artist"}</p>
    </div>
  );

  const renderPlaylistCard = (playlist) => (
    <div
      key={playlist.id}
      className="relative bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-all group min-w-[160px] snap-start"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <div className="w-full aspect-square rounded-md overflow-hidden mb-3 relative">
        <img src={playlist.thumbnail || "/fallback-album.png"} alt={playlist.title || "Unknown Playlist"} className="w-full h-full object-cover" />
        <button className="absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
          <FaPlay size={16} />
        </button>
      </div>
      <h3 className="text-white text-sm font-semibold truncate">{playlist.title || "Unknown Playlist"}</h3>
      <p className="text-[#b3b3b3] text-xs truncate">{playlist.channelTitle || "Unknown Artist"}</p>
    </div>
  );

  return (
    <div className="flex-1 w-[70%] bg-[#181818] rounded-lg p-6 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto gap-10 pr-2">
        <section>
          <h2 className="text-white text-2xl font-bold mb-6">Trending Songs</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
            {trendingSongs.length ? trendingSongs.map(renderSongCard) : <p className="text-white">No trending songs available.</p>}
          </div>
        </section>

        <section>
          <h2 className="text-white text-2xl font-bold mb-6">Popular Playlists</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
            {popularPlaylists.length ? popularPlaylists.map(renderPlaylistCard) : <p className="text-white">No playlists available.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Display;
