import { FaBook, FaGlobe, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [editing, setEditing] = useState(false);

  return (
    <aside className="hidden md:flex flex-col w-[30%] bg-[#121212] text-white p-4 font-sans overflow-y-auto">
      {/* Navigation */}
      <nav className="flex flex-col mb-4">
        <div className="px-2 py-2 flex items-center gap-3 font-bold">
          <FaBook size={18} /> Your Library
        </div>
      </nav>

      {/* Create Playlist / Playlist Card */}
      {!playlistCreated ? (
        <div className="bg-[#242424] rounded p-4 mb-4 flex flex-col gap-2">
          <h3 className="text-base font-extrabold">Create your first playlist</h3>
          <p className="text-sm text-[#ebebeb] font-semibold">
            It's easy, we'll help you
          </p>
          <button
            className="rounded-full px-3 py-2 bg-white text-black font-bold w-fit hover:bg-[#e6e6e6] hover:scale-105 transition-transform"
            onClick={() => setPlaylistCreated(true)}
          >
            Create playlist
          </button>
        </div>
      ) : (
        <div className="bg-[#242424] rounded p-4 mb-4 flex items-center justify-between">
          {editing ? (
            <input
              className="bg-[#333] text-white px-2 py-1 rounded w-full"
              value={playlistName}
              autoFocus
              onChange={(e) => setPlaylistName(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
            />
          ) : (
            <>
              <h3 className="text-base font-extrabold truncate">{playlistName}</h3>
              <FaPencilAlt
                className="cursor-pointer hover:text-green-500"
                onClick={() => setEditing(true)}
              />
            </>
          )}
        </div>
      )}

      {/* Podcast card */}
      <div className="bg-[#242424] rounded p-4 mb-4 flex flex-col gap-2">
        <h3 className="text-base font-extrabold">
          Let’s find some podcasts to follow
        </h3>
        <p className="text-sm text-[#ebebeb] font-semibold">
          We’ll keep you updated on new episodes
        </p>
        <button className="rounded-full px-3 py-2 bg-white text-black font-bold w-fit hover:bg-[#e6e6e6] hover:scale-105 transition-transform">
          Browse podcasts
        </button>
      </div>

      {/* Footer links */}
      <div className="mt-auto mb-4 flex flex-wrap gap-x-2 gap-y-2 px-2 text-[0.7rem] text-[#b3b3b3]">
        {["Legal","Safety and Privacy Center","Privacy Policy","Cookies","About Ads","Accessibility"].map((item, index) => (
          <a key={index} href="#" className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>

      {/* Language button */}
      <button className="px-2 py-1 border border-[#b3b3b3] rounded-full bg-none text-white text-sm flex items-center gap-2 hover:border-white transition-colors">
        <FaGlobe size={14} /> English
      </button>
    </aside>
  );
};

export default Sidebar;
