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
      .then(res => {
        setOfficer(res.data.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!officer) return <Loading />;

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkmodeActive
          ? "bg-gray-100 text-black"
          : "bg-linear-to-br from-slate-900 via-slate-800 to-black text-white"
      }`}
    >
      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-10 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:scale-105 transition"
      >
        ← Back
      </button>

      {/* 💎 Card */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        
        {/* 🖼 Image */}
        <div className="flex items-center justify-center bg-gray-300 p-4">
          {officer.imageUrl ? (
            <img
              src={officer.imageUrl}
              alt={officer.fullName}
              className="rounded-xl object-cover max-h-[350px]"
            />
          ) : (
            <p>No Image</p>
          )}
        </div>

        {/* 📋 Info */}
        <div className="p-6 flex flex-col gap-3">
          <h2 className="text-3xl font-bold">
            {officer.fullName}
          </h2>

          <div className="grid grid-cols-1 gap-2 text-sm">
            <p><b>BirthDate:</b> {officer.birthDate}</p>
            <p><b>DeathDate:</b> {officer.deathDate}</p>
            <p><b>Age:</b> {officer.age}</p>
            <p><b>Rank:</b> {officer.rank}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg">Biography</h3>
            <p className="text-gray-300 text-sm mt-1">
              {officer.biography}
            </p>
          </div>

          {officer.description && (
            <div className="mt-3">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-300 text-sm mt-1">
                {officer.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}