import Navbar from "../Components/Navbar";
import Display from "../Components/Display";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Main Section */}
      <div className="flex flex-row justify-between gap-4 p-3 h-[90vh]">
        <Sidebar />
        <Display />
      </div>
    </div>
  );
};

export default Home;
