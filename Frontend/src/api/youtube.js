import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/youtube",
  withCredentials: true,
});

// Search videos by query
export const searchVideos = async (query) => {
  try {
    const { data } = await API.get(`/search?q=${encodeURIComponent(query)}`);
    return data || [];
  } catch (err) {
    console.error("Failed to search videos:", err);
    return [];
  }
};

// Get single video
export const getVideo = async (videoId) => {
  try {
    const { data } = await API.get(`/video/${videoId}`);
    return data || null;
  } catch (err) {
    console.error("Failed to fetch video:", err);
    return null;
  }
};

// Get playlist items (trending / artist)
export const getPlaylist = async (playlistId) => {
  try {
    const { data } = await API.get(`/playlist/${playlistId}`);
    return data || [];
  } catch (err) {
    console.error("Failed to fetch playlist:", err);
    return [];
  }
};

// Get playlist info (for albums)
export const getPlaylistInfo = async (playlistId) => {
  try {
    const { data } = await API.get(`/playlist/info/${playlistId}`);
    return data || null;
  } catch (err) {
    console.error("Failed to fetch playlist info:", err);
    return null;
  }
};
