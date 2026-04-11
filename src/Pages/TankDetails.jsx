import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDarkmode } from "../stores/DarkModeStore";

const TankDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const [tank, setTank] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTankDetails = async () => {
    try {
      const { data } = await api.get(`/Tank/${id}`);
      setTank(data.data);
    } catch (err) {
      console.error("Error fetching tank details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTankDetails();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (!tank)
    return <p className="text-center mt-10">No data found</p>;

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
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>

      {/* 💎 Card */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        
        {/* 🖼 Image */}
        <div className="flex items-center justify-center bg-gray-300 p-4">
          {tank.imageUrl ? (
            <img
              src={tank.imageUrl}
              alt={tank.name}
              className="rounded-xl object-cover max-h-[350px]"
            />
          ) : (
            <p>No Image</p>
          )}
        </div>

        {/* 📋 Info */}
        <div className="p-6 flex flex-col gap-3">
          <h2 className="text-3xl font-bold">
            {tank.name}
          </h2>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><b>Country:</b> {tank.country}</p>
            <p><b>Type:</b> {tank.type}</p>
            <p><b>Year:</b> {tank.productionYear}</p>
            <p><b>Weight:</b> {tank.weight}</p>
            <p><b>Main Gun:</b> {tank.mainGun}</p>
            <p><b>Crew:</b> {tank.crew}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-gray-300 text-sm mt-1">
              {tank.description}
            </p>
          </div>
<button
  onClick={() => navigate(`/tank/${tank.id}/video`)}
  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
>
  Watch Video 🎥
</button>

          {/* 🔗 Extra buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate(`/generals/tank/${tank.id}`)}
              className="flex-1 bg-purple-400 text-black py-2 rounded-lg font-semibold hover:bg-purple-500 transition"
            >
              Generals
            </button>

            <button
              onClick={() => navigate(`/tankOfficers/tank/${tank.id}`)}
              className="flex-1 bg-blue-400 text-black py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
            >
              Officers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankDetails;