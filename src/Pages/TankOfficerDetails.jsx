import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import Loading from "../components/Loading";
import { useDarkmode } from "../stores/DarkModeStore";

export default function TankOfficerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    api.get(`/TankOfficer/${id}`)
      .then(res => setOfficer(res.data.data))
      .catch(console.error);
  }, [id]);

  if (!officer) return <Loading />;

  return (
    <div className={`min-h-screen px-6 py-10 ${
      isDarkmodeActive
        ? "bg-gray-100 text-black"
        : "bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white"
    }`}>

      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10
        hover:bg-white/10 hover:text-blue-400 transition"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6
        bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">


        <div className="bg-black/20 flex items-center justify-center p-4">
          {officer.imageUrl ? (
            <img
              src={officer.imageUrl}
              alt={officer.fullName}
              className="w-full h-[500px] object-cover rounded-xl shadow-lg"
            />
          ) : (
            <p className="text-gray-400">No Image</p>
          )}
        </div>


        <div className="p-6 flex flex-col gap-4">

          <h2 className="text-3xl font-bold text-blue-300">
            {officer.fullName}
          </h2>


          <div className="grid grid-cols-2 gap-3 text-sm">

            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <p className="text-gray-400">Birth Date</p>
              <p className="font-semibold">{officer.birthDate}</p>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <p className="text-gray-400">Death Date</p>
              <p className="font-semibold">{officer.deathDate || "-"}</p>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <p className="text-gray-400">Age</p>
              <p className="font-semibold">{officer.age}</p>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <p className="text-gray-400">Rank</p>
              <p className="font-semibold text-yellow-300">{officer.rank}</p>
            </div>

          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Biography</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {officer.biography}
            </p>
          </div>


          {officer.description && (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {officer.description}
              </p>
            </div>
          )}


          <button
            onClick={() => navigate(`/request/tankOfficer/${officer.id}`)}
            className="mt-2 w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600
            transition font-semibold"
          >
            ✏️ Request Edit
          </button>

        </div>
      </div>
    </div>
  );
}