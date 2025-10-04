import { FiSearch } from "react-icons/fi";
import { MdQueueMusic } from "react-icons/md"; // genre icon

const SearchBar = () => {
  return (
    <div className="flex items-center w-full max-w-[600px] bg-[#2a2a2a] rounded-full px-4 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-green-500 hover:scale-105">
      
      {/* Search Icon */}
      <FiSearch className="text-gray-400 mr-3" size={20} />
      
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
      />

      {/* Genre Icon */}
      <div className="flex items-center ml-4 cursor-pointer text-gray-400 hover:text-white transition-colors">
        <span className="mr-2">|</span>
        <MdQueueMusic size={24} />
      </div>

    </div>
  );
};

export default SearchBar;
