import { FaPlay } from "react-icons/fa";

const Results = () => {
  return (
    <div className="w-[70%] bg-[#181818] rounded-lg p-6 overflow-y-auto custom-scrollbar">
      
      {/* Flex container: Top Result + Other Songs */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        
        {/* Top Result */}
        <div className="flex flex-col items-center md:w-1/3 gap-4">
          <div className="w-48 h-48 bg-[#333] rounded-md relative overflow-hidden group">
            <button className="absolute bottom-2 right-2 bg-[#1db954] hover:bg-[#1ed760] p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
              <FaPlay size={20} />
            </button>
          </div>
          <h2 className="text-white text-2xl font-bold truncate text-center">Top Result Song Name</h2>
          <p className="text-[#b3b3b3] text-lg truncate text-center">Artist Name</p>
        </div>

        {/* Other Songs - vertical list like playlist */}
        <div className="flex-1 flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 bg-[#242424] rounded-lg p-3 hover:bg-[#2a2a2a] cursor-pointer group">
              
              {/* Song Thumbnail */}
              <div className="w-16 h-16 bg-[#333] rounded-md relative flex-shrink-0 group">
                <button className="absolute bottom-1 right-1 bg-[#1db954] hover:bg-[#1ed760] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                  <FaPlay size={14} />
                </button>
              </div>
              
              {/* Song Info */}
              <div className="flex flex-col justify-center overflow-hidden">
                <h3 className="text-white text-sm font-semibold truncate">Song Title {index+1}</h3>
                <p className="text-[#b3b3b3] text-xs truncate">Artist Name</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Playlists Section */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-4">Related Playlists</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth custom-scrollbar">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-all group min-w-[200px] snap-start"
            >
              <div className="w-full aspect-square bg-[#333] rounded-md mb-3 relative">
                <button className="absolute bottom-2 right-2 bg-[#1db954] hover:bg-[#1ed760] p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                  <FaPlay size={16} />
                </button>
              </div>
              <h3 className="text-white text-sm font-semibold truncate">Playlist Name</h3>
              <p className="text-[#b3b3b3] text-xs truncate">Creator Name</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Results;
