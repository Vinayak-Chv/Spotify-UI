import { createContext, useContext, useState, useEffect } from "react";
import { getPlaylist, getVideo } from "../api/youtube";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState({});

  const fetchSingleSong = async () => {
    if (!selectedSong) return;
    try {
      const data = await getVideo(selectedSong);
      if (!data) {
        setSong(null);
        return;
      }
      setSong({ ...data, lyrics: "Lyrics not found" });
    } catch (err) {
      console.error("Failed to fetch single song", err);
      setSong(null);
    }
  };

  const fetchAlbumSong = async (playlistId) => {
    try {
      const data = (await getPlaylist(playlistId)) || [];
      const filteredData = data.filter(s => s?.thumbnail);
      setAlbumSong(filteredData);

      if (filteredData.length > 0) {
        setAlbumData({
          title: filteredData[0].playlistTitle || "Playlist",
          description: "YouTube Playlist",
          thumbnail: filteredData[0].thumbnail,
        });
        setSelectedSong(filteredData[0].videoId);
        setIsPlaying(false);
      } else {
        setAlbumData({});
        setSelectedSong(null);
      }
    } catch (err) {
      console.error("Failed to fetch album playlist", err);
      setAlbumSong([]);
      setAlbumData({});
      setSelectedSong(null);
    }
  };

  const fetchPlaylists = async (playlistIds, type) => {
    try {
      const allVideos = [];

      for (let id of playlistIds) {
        const data = (await getPlaylist(id)) || [];
        const filteredData = data.filter(s => s?.thumbnail);

        if (type === "albums") {
          if (filteredData.length > 0) {
            setAlbums(prev => {
              const exists = prev.find(a => a.playlistId === id);
              if (exists) return prev;
              return [
                ...prev,
                {
                  playlistId: id,
                  title: filteredData[0].playlistTitle || "Untitled Album",
                  artist: filteredData[0].artist || "Unknown Artist",
                  thumbnail: filteredData[0].thumbnail,
                },
              ];
            });
          }
        } else {
          allVideos.push(...filteredData);
        }
      }

      if (type === "songs" && allVideos.length > 0) {
        setSongs(allVideos);
        setSelectedSong(allVideos[0]?.videoId || null);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Failed to fetch playlists", err);
    }
  };

  const nextMusic = () => {
    if (!songs.length || !selectedSong) return;
    const currentIndex = songs.findIndex(s => s.videoId === selectedSong);
    const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    setSelectedSong(songs[nextIndex]?.videoId || null);
  };

  const prevMusic = () => {
    if (!songs.length || !selectedSong) return;
    const currentIndex = songs.findIndex(s => s.videoId === selectedSong);
    if (currentIndex > 0) setSelectedSong(songs[currentIndex - 1]?.videoId || null);
  };

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        albums,
        selectedSong,
        setSelectedSong,
        song,
        isPlaying,
        setIsPlaying,
        albumSong,
        albumData,
        fetchAlbumSong,
        fetchPlaylists,
        fetchSingleSong,
        nextMusic,
        prevMusic,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);
