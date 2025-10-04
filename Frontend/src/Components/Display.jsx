import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchVideos } from "../api/youtube"; // frontend API

const Display = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch trending songs (example query)
      const songs = await searchVideos("top hits");
      setTrendingSongs(songs);

      // Fetch top artists (example query)
      const artists = await searchVideos("top artists");
      setTopArtists(artists);

      // Fetch popular albums/singles (example query)
      const albums = await searchVideos("popular albums");
      setPopularAlbums(albums);
    };

    fetchData();
  }, []);

  const renderSongCard = (song) => (
    <div
      key={song.videoId}
      className="relative bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-all group min-w-[160px] snap-start"
    >
      {/* Image */}
      <div className="w-full aspect-square rounded-md overflow-hidden mb-3 relative">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
          <FaPlay size={16} />
        </button>
      </div>

      {/* Song Info */}
      <h3 className="text-white text-sm font-semibold truncate">{song.title}</h3>
      <p className="text-[#b3b3b3] text-xs truncate">
        {song.channelTitle || "Unknown Artist"}
      </p>
    </div>
  );

  return (
    <div className="w-[70%] bg-[#181818] rounded-lg p-6 overflow-y-auto custom-scrollbar">
      {/* Trending Songs */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-6">Trending Songs</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
        {trendingSongs.map(renderSongCard)}
      </div>

      {/* Top Artists */}
      <div className="mt-10">
        <h2 className="text-white text-2xl font-bold mb-6">Top Artists</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {topArtists.map(renderSongCard)}
        </div>
      </div>

      {/* Popular Albums & Singles */}
      <div className="mt-10">
        <h2 className="text-white text-2xl font-bold mb-6">Popular Albums & Singles</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {popularAlbums.map(renderSongCard)}
        </div>
      </div>
    </div>
  );
};

export default Display;
