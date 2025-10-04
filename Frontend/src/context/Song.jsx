import { createContext, useContext, useState, useEffect } from "react";
import { getPlaylist, getVideo } from "../api/youtube"; // ✅ use your API helpers

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState({});

  // Fetch a single song by videoId
  const fetchSingleSong = async () => {
    if (!selectedSong) return;
    try {
      const data = await getVideo(selectedSong);
      let lyrics = "Lyrics not found";
      setSong({ ...data, lyrics });
    } catch (err) {
      console.error("Failed to fetch single song", err);
    }
  };

  // Fetch playlist for album page
  const fetchAlbumSong = async (playlistId) => {
    try {
      const data = await getPlaylist(playlistId);
      setAlbumSong(data);

      if (data.length > 0) {
        setAlbumData({
          title: "Playlist",
          description: "YouTube Playlist",
          thumbnail: data[0].thumbnail,
        });
        setSelectedSong(data[0].videoId);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Failed to fetch album playlist", err);
    }
  };

  // Fetch multiple playlists (for Home page)
  const fetchPlaylists = async (playlistIds, type) => {
    try {
      const allVideos = [];
      for (let id of playlistIds) {
        const data = await getPlaylist(id); // ✅ fixed

        if (type === "albums") {
          setAlbums((prev) => {
            const exists = prev.find((a) => a.playlistId === id);
            if (exists) return prev;
            return [
              ...prev,
              {
                playlistId: id,
                title: data[0]?.title || "Untitled Album",
                artist: data[0]?.artist || "Unknown Artist",
                thumbnail: data[0]?.thumbnail,
              },
            ];
          });
        } else {
          allVideos.push(...data);
        }
      }

      if (type === "songs") {
        setSongs(allVideos);

        if (allVideos.length > 0) {
          setSelectedSong(allVideos[0].videoId);
          setIsPlaying(false);
        }
      }
    } catch (err) {
      console.error("Failed to fetch playlists", err);
    }
  };

  // Player controls
  const nextMusic = () => {
    const currentIndex = songs.findIndex((s) => s.videoId === selectedSong);
    const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    setSelectedSong(songs[nextIndex]?.videoId);
  };

  const prevMusic = () => {
    const currentIndex = songs.findIndex((s) => s.videoId === selectedSong);
    if (currentIndex > 0) setSelectedSong(songs[currentIndex - 1]?.videoId);
  };

  // Refetch single song whenever selectedSong changes
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
