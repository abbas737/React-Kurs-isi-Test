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
    className={`min-h-screen px-6 py-10 flex items-center justify-center ${
      isDarkmodeActive
        ? "bg-gray-100 text-black"
        : "bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white"
    }`}
  >

    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 
      hover:bg-white/10 hover:text-yellow-400 transition"
    >
      ← Back
    </button>


    <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">


      <div className="relative h-[420px] md:h-full bg-gradient-to-b from-gray-700 to-gray-900">
        {tank.imageUrl ? (
          <img
            src={tank.imageUrl}
            alt={tank.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}


        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold text-yellow-400">
            {tank.name}
          </h2>
        </div>
      </div>


      <div className="p-8 flex flex-col gap-6">


        <div>
          <h2 className="text-3xl font-bold text-yellow-400 tracking-wide">
            Tank Specifications
          </h2>
          <p className="text-gray-400 text-sm">
            Technical military profile
          </p>
        </div>


        <div className="grid grid-cols-2 gap-3 text-sm">

          <div className="bg-white/5 p-3 rounded-lg">
            <b className="text-gray-400">Country</b>
            <p>{tank.country}</p>
          </div>

          <div className="bg-white/5 p-3 rounded-lg">
            <b className="text-gray-400">Type</b>
            <p>{tank.type}</p>
          </div>

          <div className="bg-white/5 p-3 rounded-lg">
            <b className="text-gray-400">Year</b>
            <p>{tank.productionYear}</p>
          </div>

          <div className="bg-white/5 p-3 rounded-lg">
            <b className="text-gray-400">Crew</b>
            <p>{tank.crew}</p>
          </div>

          <div className="bg-white/5 p-3 rounded-lg col-span-2">
            <b className="text-gray-400">Main Gun</b>
            <p>{tank.mainGun}</p>
          </div>

          <div className="bg-white/5 p-3 rounded-lg col-span-2">
            <b className="text-gray-400">Weight</b>
            <p>{tank.weight} tons</p>
          </div>

        </div>

        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            Description
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {tank.description}
          </p>
        </div>


        <div className="flex flex-col gap-3 mt-2">

          <button
            onClick={() => navigate(`/tank/${tank.id}/video`)}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold transition"
          >
            🎥 Watch Video
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/generals/tank/${tank.id}`)}
              className="flex-1 bg-purple-500 hover:bg-purple-600 py-2 rounded-lg font-semibold transition"
            >
              🎖 Generals
            </button>

            <button
              onClick={() => navigate(`/tankOfficers/tank/${tank.id}`)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition"
            >
              🪖 Officers
            </button>
          </div>

          <button
            onClick={() => navigate(`/request/tank/${tank.id}`)}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-2 rounded-lg font-semibold transition"
          >
            ✏️ Request Edit
          </button>

        </div>

      </div>
    </div>
  </div>
);
};

export default TankDetails;