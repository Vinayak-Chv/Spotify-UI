import express from "express";
import axios from "axios";
import TryCatch from "../utils/TryCatch.js";

const router = express.Router();

// Fetch all videos in a playlist
router.get("/playlist/:playlistId", TryCatch(async (req, res) => {
  const playlistId = req.params.playlistId;

  const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
    params: {
      part: "snippet,contentDetails",
      maxResults: 50, // YouTube max per request
      playlistId,
      key: process.env.YT_API_KEY,
    },
  });

  const items = response.data.items.map(item => ({
    videoId: item.contentDetails.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.high?.url || "/fallback-song.png",
    channelTitle: item.snippet.channelTitle || "Unknown Artist",
  }));

  res.json(items);
}));

// Fetch playlist info
router.get("/playlist/info/:playlistId", TryCatch(async (req, res) => {
  const playlistId = req.params.playlistId;

  const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
    params: {
      part: "snippet,contentDetails",
      maxResults: 1,
      playlistId,
      key: process.env.YT_API_KEY,
    },
  });

  const item = response.data.items[0];

  res.json({
    id: playlistId,
    title: item?.snippet?.title || "Unknown Album",
    thumbnail: item?.snippet?.thumbnails?.high?.url || "/fallback-album.png",
  });
}));

// Fetch single video details
router.get("/video/:videoId", TryCatch(async (req, res) => {
  const videoId = req.params.videoId;

  const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      id: videoId,
      key: process.env.YT_API_KEY,
    },
  });

  const video = response.data.items[0];
  if (!video) return res.status(404).json({ message: "Video not found" });

  res.json({
    videoId: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.high.url,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
  });
}));

// Search videos by query
router.get("/search", TryCatch(async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Query is required" });

  const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      maxResults: 15,
      q: query,
      type: "video",
      videoCategoryId: "10", // Music category
      key: process.env.YT_API_KEY,
    },
  });

  const items = response.data.items.map(item => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails?.high?.url || "/fallback-song.png",
    embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
  }));

  res.json(items);
}));

export default router;
