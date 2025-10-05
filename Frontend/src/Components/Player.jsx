import { usePlayer } from "../context/PlayerContext";

const Player = () => {
  const { currentSong } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#181818] text-white p-4 flex justify-between items-center border-t border-gray-700 z-50">
      <span className="font-semibold truncate max-w-[50%]">
        {currentSong.title}
      </span>
      <audio
        controls
        autoPlay
        src={currentSong.url}
        className="w-[40%]"
      ></audio>
    </div>
  );
};

export default Player;
