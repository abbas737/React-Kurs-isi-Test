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

  // 🔥 yeni state
  const [newDescription, setNewDescription] = useState("");

  // 🔷 GET General
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

  // 🔷 SEND REQUEST
  const sendRequest = async () => {
    if (!newDescription.trim()) {
      alert("Description boş ola bilməz");
      return;
    }

    try {
      await api.post("/EditRequest", {
        entityType: "General",
        entityId: general.id,
        oldDescription: general.description,
        newDescription: newDescription,
      });

      alert("Request göndərildi ✅");
      setNewDescription("");
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (!general)
    return <p className="text-center mt-10">General not found</p>;

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
      hover:bg-white/10 hover:text-green-400 transition"
    >
      ← Back
    </button>


    <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">


      <div className="relative h-[420px] md:h-full bg-gradient-to-b from-gray-700 to-gray-900">
        {general.imageUrl ? (
          <img
            src={general.imageUrl}
            alt={general.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold text-green-400">
            {general.fullName}
          </h2>
        </div>
      </div>


      <div className="p-8 flex flex-col gap-6">

        <div>
          <h2 className="text-3xl font-bold text-green-400">
            Military General Profile
          </h2>
          <p className="text-gray-400 text-sm">
            Historical biography & data
          </p>
        </div>


        <div className="grid grid-cols-3 gap-3 text-sm">

          <div className="bg-white/5 p-3 rounded-lg">
            <b className="text-gray-400">Birth Date</b>
            <p>{general.birthDate}</p>
          </div>

          <div className="bg-white/5 p-3 rounded-lg">
            <b className="text-gray-400">Age</b>
            <p>{general.age}</p>
          </div>

          <div className="bg-white/5 p-3 rounded-lg col-span-1">
            <b className="text-gray-400">Death Date</b>
            <p>{general.deathDate}</p>
          </div>

        </div>


        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-2">
            Biography
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed bg-white/5 p-3 rounded-lg">
            {general.biography}
          </p>
        </div>

        {general.description && (
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Description
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed bg-white/5 p-3 rounded-lg">
              {general.description}
            </p>
          </div>
        )}


        <button
          onClick={() => navigate(`/request/general/${general.id}`)}
          className="w-full mt-2 bg-green-400 text-black hover:bg-green-500 py-2 rounded-lg font-semibold transition"
        >
          ✏️ Request Edit
        </button>

      </div>
    </div>
  </div>
);
}