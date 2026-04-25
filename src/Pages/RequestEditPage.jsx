import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDarkmode } from "../stores/DarkModeStore";

export default function RequestEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const [general, setGeneral] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 form state
  const [form, setForm] = useState({
    fullName: "",
    birthDate: "",
    deathDate: "",
    biography: "",
    description: "",
  });

  // 🔷 GET GENERAL
  const getGeneral = async () => {
    try {
      const { data } = await api.get(`/General/${id}`);
      const g = data.data;

      setGeneral(g);

      setForm({
        fullName: g.fullName || "",
        birthDate: g.birthDate || "",
        deathDate: g.deathDate || "",
        biography: g.biography || "",
        description: g.description || "",
      });
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGeneral();
  }, [id]);

  // 🔷 HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔷 SEND REQUEST
 const handleSubmit = async () => {
  try {
    await api.post("/EditRequest", {
      entityType: "General",
      entityId: general.id,

      generalFullName: form.fullName,
      generalBirthDate: form.birthDate,
      generalDeathDate: form.deathDate,
      generalBiography: form.biography,
      generalDescription: form.description,
    });

    alert("Request göndərildi ✅");
    navigate(-1);
  } catch (err) {
    console.error("Error sending request:", err);
  }
};

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

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          ✏️ Edit Request
        </h2>


        <label className="block mb-2">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded-lg text-black"
        />


        <label className="block mb-2">Birth Date</label>
        <input
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded-lg text-black"
        />


        <label className="block mb-2">Death Date</label>
        <input
          name="deathDate"
          value={form.deathDate}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded-lg text-black"
        />


        <label className="block mb-2">Biography</label>
        <textarea
          name="biography"
          value={form.biography}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded-lg text-black"
        />


        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded-lg text-black"
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