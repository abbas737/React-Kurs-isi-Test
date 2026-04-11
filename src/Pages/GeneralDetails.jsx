import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDarkmode } from "../stores/DarkModeStore";



export default function GeneralDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const [general, setGeneral] = useState(null);
  const [loading, setLoading] = useState(true);



  const getGeneral = async () => {
    try {
      const { data } = await api.get(`/General/${id}`);
      setGeneral(data.data);
    } catch (err) {
      console.error("Error fetching general:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGeneral();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (!general)
    return <p className="text-center mt-10">General not found</p>;

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
        className="mb-6 px-4 py-2 bg-green-600 text-black rounded-lg hover:scale-105 transition"
      >
        ← Back
      </button>

      {/* 💎 Card */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        
        {/* 🖼 Image */}
        <div className="flex items-center justify-center bg-gray-300 p-4">
          {general.imageUrl ? (
            <img
              src={general.imageUrl}
              alt={general.fullName}
              className="rounded-xl object-cover max-h-[350px]"
            />
          ) : (
            <p>No Image</p>
          )}
        </div>

        {/* 📋 Info */}
        <div className="p-6 flex flex-col gap-3">
          <h2 className="text-3xl font-bold">
            {general.fullName}
          </h2>

          <div className="grid grid-cols-3 gap-2 text-sm">
            
            <p><b>BirthDate:</b> {general.birthDate}</p>
            <p><b>Age:</b> {general.age}</p>
            <p><b>DeathDate:</b> {general.deathDate}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg">Biography</h3>
            <p className="text-gray-300 text-sm mt-1">
              {general.biography}
            </p>
          </div>

          {general.description && (
            <div className="mt-3">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-300 text-sm mt-1">
                {general.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}