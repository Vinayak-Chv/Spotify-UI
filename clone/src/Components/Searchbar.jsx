import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="flex items-center w-full max-w-[600px] bg-[#2a2a2a] rounded-full px-9 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-green-500 hover:scale-105">
      <FiSearch className="text-gray-400 mr-3" size={20} />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
      />
    </div>
  );
};

export default SearchBar;
