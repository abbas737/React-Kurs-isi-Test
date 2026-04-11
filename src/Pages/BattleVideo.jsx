import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { getBattleVideo } from "../utils/tankBattleVideos";


export default function BattleVideo() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const t1Id = params.get("t1");
  const t2Id = params.get("t2");

  const [tank1, setTank1] = useState(null);
  const [tank2, setTank2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    Promise.all([
  api.get(`/Tank/${t1Id}`),
  api.get(`/Tank/${t2Id}`),
  api.get(`/TankBattleVideos/battle-video?t1=${t1Id}&t2=${t2Id}`) // ✅ BURA
])
.then(([res1, res2, videoRes]) => {
  const t1 = res1.data.data;
  const t2 = res2.data.data;

  setTank1(t1);
  setTank2(t2);

  const win = calculateWinner(t1, t2);
  setWinner(win);

  setVideoUrl(videoRes.data.data.videoUrl); // ✅ BURA
})
  }, []);

  const calculateWinner = (t1, t2) => {
    let score1 = 0;
    let score2 = 0;

    if (t1.weight > t2.weight) score1++;
    else score2++;

    if (t1.crew > t2.crew) score1++;
    else score2++;

    if (t1.mainGun?.length > t2.mainGun?.length) score1++;
    else score2++;

    return score1 > score2 ? t1 : t2;
  };

    const convertToEmbed = (url) => {
    if (!url) return "";

    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }

    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    return url;
  };

  if (!tank1 || !tank2) return <p className="text-white text-center mt-10">Loading...</p>;
  

  return (
    
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      
<div className="w-full max-w-6xl self-start ml-2 mt-2">
  <button
    onClick={() => navigate(-1)}
    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 
    hover:bg-white/10 hover:text-yellow-400 transition"
  >
    ← Back
  </button>
</div>
      <div>
      <h2 className="text-4xl font-bold">
        {tank1.name} VS {tank2.name}
      </h2>
      </div>
      

      {/* 🔥 VS Animation */}
    <div className="flex items-center gap-10 text-center">

  {/* Tank 1 */}
  <div>
    <div className="w-40 h-40 mx-auto overflow-hidden rounded-xl bg-gray-300">
      <img
        src={tank1.imageUrl}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="mt-2">{tank1.name}</p>
  </div>

  {/* VS */}
  <span className="text-5xl font-bold text-red-500 animate-pulse">
    VS
  </span>

  {/* Tank 2 */}
  <div>
    <div className="w-40 h-40 mx-auto overflow-hidden rounded-xl bg-gray-300">
      <img
        src={tank2.imageUrl}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="mt-2">{tank2.name}</p>
  </div>

</div>

      {/* 🏆 WINNER */}
      {winner && (
        <div className="text-2xl font-bold text-yellow-400 animate-bounce">
          🏆 Winner: {winner.name}
        </div>
      )}

      {/* 🎥 VIDEO */}
      <div className="w-full h-[70vh] rounded-xl overflow-hidden">
  {videoUrl ? (
    <iframe
      src={convertToEmbed(videoUrl)}
      className="w-full h-full"
      allowFullScreen
    />
  ) : (
    <p className="text-gray-400 mt-10">Video not found...</p>
  )}
</div>


    </div>
  );
}