import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AdminTankVideos() {
  const [tanks, setTanks] = useState([]);
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/Tank?Page=1&PageSize=100")
      .then(res => setTanks(res.data.data.items))
      .catch(err => console.error(err));
  }, []);

  const handleSave = async () => {
    try {
      await api.post(`/TankBattleVideos/battle-video`, {
  tank1Id: Number(t1),
  tank2Id: Number(t2),
  videoUrl
});

      alert("🔥 Battle video saved!");
      setT1("");
      setT2("");
      setVideoUrl("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 text-white p-6">


      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-5 py-2 rounded-xl bg-white/5 border border-white/10
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>


      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
        ⚔️ Create Tank Battle Video
      </h1>

      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">


        <div className="grid md:grid-cols-2 gap-4 mb-5">

          <div>
            <p className="text-sm text-gray-400 mb-1">Tank 1</p>
            <select
              value={t1}
              onChange={(e) => setT1(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
            >
              <option value="">Select first tank</option>
              {tanks.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Tank 2</p>
            <select
              value={t2}
              onChange={(e) => setT2(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
            >
              <option value="">Select second tank</option>
              {tanks.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

        </div>


        <div className="flex items-center justify-center gap-6 my-6">
          <div className="px-4 py-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
            🛡️ Tank 1
          </div>

          <div className="text-2xl font-bold text-red-500 animate-pulse">
            VS
          </div>

          <div className="px-4 py-2 bg-red-500/20 rounded-xl border border-red-500/30">
            🔥 Tank 2
          </div>
        </div>


        <div className="mb-5">
          <p className="text-sm text-gray-400 mb-1">YouTube Video URL</p>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
          />
        </div>


        <button
          onClick={handleSave}
          disabled={!t1 || !t2 || !videoUrl}
          className="w-full py-3 rounded-xl font-bold text-black
          bg-gradient-to-r from-yellow-400 to-red-500
          hover:scale-105 active:scale-95 transition
          disabled:opacity-40 disabled:hover:scale-100"
        >
          🚀 Save Battle Video
        </button>

      </div>
    </div>
  );
}