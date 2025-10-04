import { FaBook, FaGlobe } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-1/4 bg-[#121212] text-white flex flex-col p-2 font-sans overflow-y-auto h-[90vh]">
      {/* Navigation */}
      <nav className="flex flex-col mb-4">
        <a
          href="#"
          className="text-[#b3b3b3] no-underline px-4 py-2 rounded flex items-center gap-3 font-bold hover:text-white hover:bg-[#242424] transition-all"
        >
          <FaBook size={18} /> Your Library
        </a>
      </nav>

      {/* Playlist card */}
      <div className="bg-[#242424] rounded-lg p-4 m-2 flex flex-col gap-3">
        <h3 className="text-base font-extrabold">Create your first playlist</h3>
        <p className="text-sm text-[#ebebeb] font-semibold">
          It's easy, we'll help you
        </p>
        <button className="rounded-full px-4 py-2 bg-white text-black font-bold w-fit hover:bg-[#e6e6e6] hover:scale-110 transition-transform">
          Create playlist
        </button>
      </div>

      {/* Podcast card */}
      <div className="bg-[#242424] rounded-lg p-4 m-2 flex flex-col gap-3">
        <h3 className="text-base font-extrabold">
          Let’s find some podcasts to follow
        </h3>
        <p className="text-sm text-[#ebebeb] font-semibold">
          We’ll keep you updated on new episodes
        </p>
        <button className="rounded-full px-4 py-2 bg-white text-black font-bold w-fit hover:bg-[#e6e6e6] hover:scale-110 transition-transform">
          Browse podcasts
        </button>
      </div>

      {/* Footer links */}
      <div className="mt-auto mb-4 flex flex-wrap gap-x-4 gap-y-2 px-4 text-[0.7rem] text-[#b3b3b3]">
        {[
          "Legal",
          "Safety and Privacy Center",
          "Privacy Policy",
          "Cookies",
          "About Ads",
          "Accessibility",
        ].map((item, index) => (
          <a
            key={index}
            href="#"
            className="hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Language button */}
      <button className="m-4 px-3 py-1 border border-[#b3b3b3] rounded-full bg-none text-white text-sm flex items-center gap-2 hover:border-white transition-colors">
        <FaGlobe size={14} /> English
      </button>
    </aside>
  );
};

export default Sidebar;
