import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDarkmode } from "../stores/DarkModeStore";

export default function TankVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const [tank, setTank] = useState(null);

  useEffect(() => {
    api.get(`/Tank/${id}`)
      .then(res => setTank(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be")) {
      return url.replace("https://youtu.be/", "https://www.youtube.com/embed/");
    }
    return url.replace("watch?v=", "embed/");
  };

  if (!tank) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkmodeActive
          ? "bg-gray-100 text-black"
          : "bg-black text-white"
      }`}
    >
      {/* 🔙 Back */}
         <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>

      {/* 🎬 Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        {tank.name} - Video
      </h2>

      {/* 🎥 VIDEO FULL */}
     <div className="w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
  <iframe
    src={getYoutubeEmbedUrl(tank.videoUrl)}
    className="w-full h-full"
    allowFullScreen
  ></iframe>
</div>
    </div>
  );
}