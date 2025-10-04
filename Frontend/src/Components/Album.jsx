import { FaPlay } from "react-icons/fa";

const Album = () => {
  return (
    <div className="w-[70%] bg-[#181818] rounded-lg p-6 overflow-y-auto custom-scrollbar">
      {/* Album/Artist Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Cover Image Placeholder */}
          <div className="w-24 h-24 bg-[#333] rounded-md"></div>

          {/* Title and Artist */}
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-2xl font-bold">Album / Artist Name</h2>
            <p className="text-[#b3b3b3] text-sm">Creator / Artist</p>
          </div>
        </div>

        {/* Play All Button */}
        <button className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300">
          <FaPlay /> Play All
        </button>
      </div>

      {/* Songs List */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-[#242424] p-3 rounded-lg hover:bg-[#2a2a2a] transition-all cursor-pointer"
          >
            {/* Image Container */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#333] rounded-md relative">
                {/* Play Button Overlay */}
                <button className="absolute bottom-1 right-1 bg-[#1db954] hover:bg-[#1ed760] p-2 rounded-full transition-all duration-300">
                  <FaPlay size={14} />
                </button>
              </div>
            </div>

            {/* Song Info Container */}
            <div className="flex flex-col flex-1">
              <h3 className="text-white font-semibold text-sm">Song Title {index + 1}</h3>
              <p className="text-[#b3b3b3] text-xs truncate">Artist Name</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
