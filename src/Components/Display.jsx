import { FaPlay } from "react-icons/fa";

const Display = () => {
  return (
    <div className="w-[70%] bg-[#181818] rounded-lg p-6 overflow-y-auto custom-scrollbar">
      {/* Section Title */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-6">Trending Songs</h2>
      </div>

      {/* Songs Placeholder */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="relative bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-all group min-w-[160px] snap-start"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-square bg-[#333] rounded-md overflow-hidden mb-3 relative">
              {/* Play Button Overlay */}
              <button className="absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
                <FaPlay size={16} />
              </button>
            </div>

            {/* Song Info Placeholder */}
            <h3 className="text-white text-sm font-semibold truncate">
              Song Title
            </h3>
            <p className="text-[#b3b3b3] text-xs truncate">Artist Name</p>
          </div>
        ))}
      </div>

      {/* Artist Section */}
      <div className="mt-10">
        <h2 className="text-white text-2xl font-bold mb-6">Top Artists</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center cursor-pointer group min-w-[140px] snap-start relative"
            >
              {/* Circular Artist Placeholder */}
              <div className="w-32 h-32 bg-[#333] rounded-full mb-3 overflow-visible relative">
                {/* Play Button fully visible outside bottom-right */}
                <button className="absolute bottom-1 right-3 translate-x-1/2 translate-y-1/2 bg-[#1db954] hover:bg-[#1ed760] text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                  <FaPlay size={18} />
                </button>
              </div>

              {/* Artist Info */}
              <h3 className="text-white text-sm font-semibold truncate">
                Artist Name
              </h3>
              <p className="text-[#b3b3b3] text-xs truncate">Artist</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular albums and singles */}
      <div className="mt-10">
        <h2 className="text-white text-2xl font-bold mb-6">Popular Albums & Singles</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-all group min-w-[160px] snap-start"
            >
              {/* Image Placeholder */}
              <div className="w-full aspect-square bg-[#333] rounded-md overflow-hidden mb-3 relative">
                <button className="absolute bottom-2 right-2 bg-[#1db954] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300">
                  <FaPlay size={16} />
                </button>
              </div>

              {/* Album Info */}
              <h3 className="text-white text-sm font-semibold truncate">
                Album Name
              </h3>
              <p className="text-[#b3b3b3] text-xs truncate">Artist Name</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Display;
