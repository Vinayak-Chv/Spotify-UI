import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useState } from "react";

const PlayerBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] h-20 flex items-center justify-between px-6 border-t border-[#282828] shadow-[0_-2px_10px_rgba(0,0,0,0.4)]">
      
      {/* --- Left: Song Info --- */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="w-14 h-14 bg-[#333] rounded-md overflow-hidden flex-shrink-0"></div>
        <div className="flex flex-col">
          <h3 className="text-white text-sm font-semibold truncate max-w-[150px]">
            Song Title
          </h3>
          <p className="text-[#b3b3b3] text-xs truncate max-w-[150px]">
            Artist Name
          </p>
        </div>
      </div>

      {/* --- Middle: Controls --- */}
      <div className="flex flex-col items-center gap-2 w-1/3">
        <div className="flex items-center gap-6">
          <FaStepBackward
            size={18}
            className="text-gray-300 cursor-pointer hover:text-white transition"
          />
          {isPlaying ? (
            <FaPause
              size={24}
              onClick={() => setIsPlaying(false)}
              className="text-black bg-white rounded-full p-2 cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <FaPlay
              size={24}
              onClick={() => setIsPlaying(true)}
              className="text-black bg-white rounded-full p-2 cursor-pointer hover:scale-110 transition"
            />
          )}
          <FaStepForward
            size={18}
            className="text-gray-300 cursor-pointer hover:text-white transition"
          />
        </div>

        {/* --- Progress Bar --- */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[10px] text-gray-400">0:00</span>
          <div className="w-full h-[4px] bg-[#333] rounded-full">
            <div className="w-[30%] h-full bg-[#1db954] rounded-full"></div>
          </div>
          <span className="text-[10px] text-gray-400">3:45</span>
        </div>
      </div>

      {/* --- Right: Volume --- */}
      <div className="flex items-center justify-end gap-3 w-1/3">
        <HiOutlineSpeakerWave className="text-gray-300" size={20} />
        <input
          type="range"
          min="0"
          max="100"
          className="w-28 accent-[#1db954] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PlayerBar;
