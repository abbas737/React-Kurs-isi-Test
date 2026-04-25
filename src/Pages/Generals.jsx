import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDarkmode } from "../stores/DarkModeStore";

export default function Generals() {
  const { tankId } = useParams(); 
  const { isDarkmodeActive } = useDarkmode();
  const navigate = useNavigate();

  const [generals, setGenerals] = useState([]);

  useEffect(() => {
    if (!tankId) return;

    api.get(`/General/tank/${tankId}?page=1&pageSize=10`)
      .then(res => setGenerals(res.data.data.items))
      .catch(err => console.error(err));
  }, [tankId]);

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        isDarkmodeActive
          ? "bg-gray-100 text-black"
          : "bg-linear-to-br from-slate-900 via-slate-800 to-black text-white"
      }`}
    >
         <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 
        hover:bg-white/10 hover:text-green-400 transition"
      >
        ← Back
      </button>
      

      <h2 className="text-4xl font-bold text-center mb-10">
       Generals
      </h2>


      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {generals.map(g => (
          <Link
            key={g.id}
            to={`/generals/${g.id}`}
            className="group bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-103 hover:shadow-green-500/30 transition duration-300"
          >

           <div className="h-48 bg-gray-300 overflow-hidden relative">
  {g.imageUrl ? (
    <img
      src={g.imageUrl}
      alt={g.fullName}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
    />
  ) : (
    <div className="flex items-center justify-center h-full text-gray-600">
      No Image
    </div>
  )}
</div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-bold">
                {g.fullName}
              </h3>

              <p className="text-sm text-gray-400">
                Age: {g.age}
              </p>

              <div className="mt-2 bg-green-600 text-black text-center py-1 rounded-lg font-semibold group-hover:bg-green-600 transition">
                View Details
              </div>
            </div>
          </Link>
        ))}
      </div>


      {generals.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          No generals found...
        </p>
      )}
    </div>
  );
}