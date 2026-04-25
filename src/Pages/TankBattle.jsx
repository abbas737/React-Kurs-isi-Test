import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function TankBattle() {
  const [tanks, setTanks] = useState([]);
  const [tank1, setTank1] = useState("");
  const [tank2, setTank2] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/Tank?Page=1&PageSize=50")
      .then(res => setTanks(res.data.data.items))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex flex-col items-center justify-center px-6 relative">


      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 
        hover:bg-white/20 hover:text-red-400 transition"
      >
        ← Back
      </button>


      <h2 className="text-5xl font-extrabold mb-12 tracking-wider text-red-400 drop-shadow-lg">
        ⚔️ TANK BATTLE
      </h2>

      <div className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-2xl">

        <div className="flex items-center justify-between gap-6">


          <div className="flex-1">
            <label className="block text-sm mb-2 text-gray-300">Tank 1</label>
            <select
              value={tank1}
              onChange={e => setTank1(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Tank</option>
              {tanks.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="text-4xl font-black text-red-500 animate-pulse">
            VS
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-2 text-gray-300">Tank 2</label>
            <select
              value={tank2}
              onChange={e => setTank2(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Tank</option>
              {tanks.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

        </div>

        <button
          disabled={!tank1 || !tank2}
          onClick={() => navigate(`/battle/video?t1=${tank1}&t2=${tank2}`)}
          className="mt-10 w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 font-bold text-lg 
          hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Battle 🔥
        </button>

      </div>
    </div>
  );
}