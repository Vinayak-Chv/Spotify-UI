import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/youtube",
  withCredentials: true,
});

export const searchVideos = async (query) => {
  try {
    const { data } = await API.get(`/search?q=${encodeURIComponent(query)}`);
    return data;
  } catch (err) {
    console.error("Failed to search videos:", err);
    return [];
  }
};

export const getVideo = async (videoId) => {
  try {
    const { data } = await API.get(`/video/${videoId}`);
    return data;
  } catch (err) {
    console.error("Failed to fetch video:", err);
    return null;
  }
};

export const getPlaylist = async (playlistId) => {
  try {
    const { data } = await API.get(`/playlist/${playlistId}`);
    return data;
  } catch (err) {
    console.error("Failed to fetch playlist:", err);
    return [];
  }
};
