import { FaSpotify } from "react-icons/fa"
import { RiHome4Fill } from "react-icons/ri";
import Searchbar from "./Searchbar";
import { GrInstallOption } from "react-icons/gr";
import { PiLineVerticalThin } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center text-white m-2 p-3 pl-5">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        <FaSpotify size={35} />

        <button className="bg-[#222] p-2 rounded-full ml-4 hover:bg-[#444] transition-transform hover:scale-105">
          <RiHome4Fill size={32} />
        </button>

        <div>
          <Searchbar />
        </div>
      </div>

      {/* Right Side */}
      <div>
        <ol className="decoration-none flex font-semibold justify-around items-center gap-6">
          <li className="navbarHover">Premium</li>
          <li className="navbarHover">Support</li>
          <li className="navbarHover">Download</li>
          <li><PiLineVerticalThin size={30} /></li>
          <li className="flex items-center navbarHover"><GrInstallOption size={15} className="mr-3" />Install App</li>
          <li className="navbarHover">Sign up</li>
          <li className="text-lg font-semibold border-white rounded-full px-5 py-2 hover:bg-white hover:text-black cursor-pointer transition-all duration-300">Log in</li>
        </ol>
      </div>
    </nav>
  );
};

export default Navbar;
