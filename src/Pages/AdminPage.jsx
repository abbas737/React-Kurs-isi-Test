import { useNavigate } from "react-router-dom";
import { useTokens } from "../stores/TokenStore";
 

export default function AdminPage() {
  const navigate = useNavigate();
  const role = useTokens(state => state.role);
  const {clearTokens} = useTokens();

  if (role !== "Admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
        Access Denied ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wide">
          ⚙️ Admin Panel
        </h1>

        <button
          onClick={clearTokens}
          className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>


      <div className="grid md:grid-cols-3 gap-8">

        {/* TANKS */}
        <button
          onClick={() => navigate("/admin/tanks")}
          className="group p-8 bg-white/5 border border-white/10 rounded-2xl 
          hover:scale-105 hover:shadow-yellow-500/30 transition duration-300 backdrop-blur-lg"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition">
            ⚙️
          </div>
          <h2 className="text-xl font-bold mb-2">Manage Tanks</h2>
          <p className="text-gray-400 text-sm">
            Create, update, delete tanks
          </p>
        </button>

        {/* GENERALS */}
        <button
          onClick={() => navigate("/admin/generals/3")}
          className="group p-8 bg-white/5 border border-white/10 rounded-2xl 
          hover:scale-105 hover:shadow-blue-500/30 transition duration-300 backdrop-blur-lg"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition">
            🎖
          </div>
          <h2 className="text-xl font-bold mb-2">Manage Generals</h2>
          <p className="text-gray-400 text-sm">
            Edit and control generals
          </p>
        </button>


        {/* OFFICERS */}
        <button
          onClick={() => navigate("/admin/officers")}
          className="group p-8 bg-white/5 border border-white/10 rounded-2xl 
          hover:scale-105 hover:shadow-green-500/30 transition duration-300 backdrop-blur-lg"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition">
            🪖
          </div>
          <h2 className="text-xl font-bold mb-2">Tank Officers</h2>
          <p className="text-gray-400 text-sm">
            Manage officers and data
          </p>
        </button>

      </div>
    </div>
  );
}