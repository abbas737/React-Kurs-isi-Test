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
    <div className="min-h-screen p-8 bg-linear-to-br from-slate-900 via-slate-800 to-black text-white text-center relative">

      {/* 🔙 BACK */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-8">⚔️ Tank Battle</h2>

      <div className="flex justify-center gap-6 text-white">
        {/* Tank 1 */}
        <select
          value={tank1}
          onChange={e => setTank1(e.target.value)}
          className="p-2 rounded  text-gray-500"
        >
          <option value="">Select Tank 1</option>
          {tanks.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <span className="text-2xl font-bold">VS</span>

        {/* Tank 2 */}
        <select
          value={tank2}
          onChange={e => setTank2(e.target.value)}
          className="p-2 rounded text-gray-500"
        >
          <option value="">Select Tank 2</option>
          {tanks.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* 🔥 Start Battle */}
      <button
        disabled={!tank1 || !tank2}
        onClick={() =>
          navigate(`/battle/video?t1=${tank1}&t2=${tank2}`)
        }
        className="mt-8 px-6 py-3 bg-red-500 rounded-lg font-bold disabled:opacity-50 hover:bg-red-600 transition"
      >
        Start Battle 🔥
      </button>
    </div>
  );
}