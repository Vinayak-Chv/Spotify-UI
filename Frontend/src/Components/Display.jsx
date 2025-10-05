import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getPlaylist, getPlaylistInfo } from "../api/youtube";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TRENDING_ID = "RDCLAK5uy_ly0ZHQ7uutQ76YAUjYks4rEG9dOhL9Rfw";
        const ARTIST_ID = "PL8fVUTBmJhHJmpP7bhE4GIr5Y2kOxV2rY";
        const ALBUM_IDS = [
          "RDCLAK5uy_nmS3YoxSwVVQk9lEQJ0UX4ZCjXsW_psU8",
          "RDCLAK5uy_mjFIQx6np0uEk0EFQnkGFxqR3OMxReYv0",
          "RDCLAK5uy_nLOvZAnN86K4f-fJ6tUi0xHUPBHLBBkVE"
        ];

        // Fetch trending & artist playlists safely
        const trending = (await getPlaylist(TRENDING_ID)) || [];
        const artists = (await getPlaylist(ARTIST_ID)) || [];

        const filteredTrending = trending.filter(song => song?.thumbnail).slice(0, 10);
        const filteredArtists = artists.filter(song => song?.thumbnail).slice(0, 10);

        // Fetch album info safely
        const albums = [];
        for (let id of ALBUM_IDS) {
          const info = await getPlaylistInfo(id);
          if (info && info.thumbnail) albums.push(info);
        }

        setTrendingSongs(filteredTrending);
        setTopArtists(filteredArtists);
        setPopularAlbums(albums);
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
    >
      <div className="w-full aspect-square rounded-md overflow-hidden mb-3 relative">
        <img
          src={song.thumbnail || "/fallback-song.png"}
          alt={song.title || "Unknown Song"}
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
          <FaPlay size={16} />
        </button>
      </div>
      <h3 className="text-white text-sm font-semibold truncate">{song.title || "Unknown Title"}</h3>
      <p className="text-[#b3b3b3] text-xs truncate">{song.channelTitle || "Unknown Artist"}</p>
    </div>
  );

  const renderAlbumCard = (album) => (
    <div
      key={album.id}
      className="relative bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-all group min-w-[160px] snap-start"
      onClick={() => album.id && navigate(`/album/${album.id}`)}
    >
      <div className="w-full aspect-square rounded-md overflow-hidden mb-3 relative">
        <img
          src={album.thumbnail || "/fallback-album.png"}
          alt={album.title || "Unknown Album"}
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
          <FaPlay size={16} />
        </button>
      </div>
      <h3 className="text-white text-sm font-semibold truncate">{album.title || "Unknown Album"}</h3>
    </div>
  );

  return (
    <div className="w-[70%] mb-5 bg-[#181818] rounded-lg p-6 overflow-y-auto custom-scrollbar">
      {/* Trending Songs */}
      <section>
        <h2 className="text-white text-2xl font-bold mb-6">Trending Songs</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {trendingSongs.length ? trendingSongs.map(renderSongCard) : <p className="text-white">No trending songs available.</p>}
        </div>
      </section>

      {/* Top Artists */}
      <section className="mt-10">
        <h2 className="text-white text-2xl font-bold mb-6">Top Artists</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {topArtists.length ? topArtists.map(renderSongCard) : <p className="text-white">No top artists available.</p>}
        </div>
      </section>

      {/* Popular Albums */}
      <section className="mt-10">
        <h2 className="text-white text-2xl font-bold mb-6">Popular Albums</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {popularAlbums.length ? popularAlbums.map(renderAlbumCard) : <p className="text-white">No albums available.</p>}
        </div>
      </section>
    </div>
  );
};

export default Display;
