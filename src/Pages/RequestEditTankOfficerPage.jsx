import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDarkmode } from "../stores/DarkModeStore";

export default function RequestEditTankOfficerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const [officer, setOfficer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    rank: "",
    birthDate: "",
    deathDate: "",
    biography: "",
    description: "",
    imageUrl: "",
    tankId: ""
  });

  // 🔷 GET OFFICER
  const getOfficer = async () => {
    try {
      const { data } = await api.get(`/TankOfficer/${id}`);
      const o = data.data;

      setOfficer(o);

      setForm({
        fullName: o.fullName || "",
        rank: o.rank || "",
        birthDate: o.birthDate || "",
        deathDate: o.deathDate || "",
        biography: o.biography || "",
        description: o.description || "",
        imageUrl: o.imageUrl || "",
      });

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOfficer();
  }, [id]);

  // 🔷 CHANGE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔷 SEND REQUEST
  const handleSubmit = async () => {
    try {
      await api.post("/EditRequest", {
        entityType: "TankOfficer",
        entityId: officer.id,

        officerFullName: form.fullName,
        officerRank: form.rank,
        officerBirthDate: form.birthDate,
        officerDeathDate: form.deathDate,
        officerBiography: form.biography,
        officerDescription: form.description,
        officerImageUrl: form.imageUrl,
      });

      alert("Request göndərildi ✅");
      navigate(-1);

    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (!officer)
    return <p className="text-center mt-10">Officer not found</p>;

  return (
    <div className={`min-h-screen p-6 ${
      isDarkmodeActive
        ? "bg-gray-100 text-black"
        : "bg-linear-to-br from-slate-900 via-slate-800 to-black text-white"
    }`}>


       <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          ✏️ Edit Tank Officer
        </h2>

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-3 p-2 rounded-lg text-black"
        />

        <input
          name="rank"
          value={form.rank}
          onChange={handleChange}
          placeholder="Rank"
          className="w-full mb-3 p-2 rounded-lg text-black"
        />

        <input
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          placeholder="Birth Date"
          className="w-full mb-3 p-2 rounded-lg text-black"
        />

        <input
          name="deathDate"
          value={form.deathDate}
          onChange={handleChange}
          placeholder="Death Date"
          className="w-full mb-3 p-2 rounded-lg text-black"
        />

        <textarea
          name="biography"
          value={form.biography}
          onChange={handleChange}
          placeholder="Biography"
          className="w-full mb-3 p-2 rounded-lg text-black"
        />

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full mb-3 p-2 rounded-lg text-black"
        />


        <button
          onClick={handleSubmit}
          className="mt-2 px-6 py-2 bg-blue-500 rounded-lg hover:scale-105 transition"
        >
          Send Request
        </button>

      </div>
    </div>
  );
}