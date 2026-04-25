import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDarkmode } from "../stores/DarkModeStore";

export default function RequestEditTankPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const [tank, setTank] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    country: "",
    type: "",
    productionYear: "",
    weight: "",
    mainGun: "",
    crew: "",
    description: ""
  });

  // 🔷 GET Tank
  const getTank = async () => {
    try {
      const { data } = await api.get(`/Tank/${id}`);
      const t = data.data;

      setTank(t);

      setForm({
        name: t.name || "",
        country: t.country || "",
        type: t.type || "",
        productionYear: t.productionYear || "",
        weight: t.weight || "",
        mainGun: t.mainGun || "",
        crew: t.crew || "",
        description: t.description || ""
      });

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTank();
  }, [id]);

  // 🔷 INPUT CHANGE
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
  entityType: "Tank",
  entityId: tank.id,

  tankName: form.name,
  tankCountry: form.country,
  tankType: form.type,
  tankProductionYear: Number(form.productionYear),
  tankWeight: Number(form.weight),
  tankMainGun: form.mainGun,
  tankCrew: Number(form.crew),
  tankDescription: form.description
});

      alert("Request göndərildi ✅");
      navigate(-1);

    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (!tank)
    return <p className="text-center mt-10">Tank not found</p>;

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
          ✏️ Edit Tank
        </h2>


        <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
          className="w-full mb-3 p-2 rounded-lg text-black" />

        <input name="country" value={form.country} onChange={handleChange} placeholder="Country"
          className="w-full mb-3 p-2 rounded-lg text-black" />

        <input name="type" value={form.type} onChange={handleChange} placeholder="Type"
          className="w-full mb-3 p-2 rounded-lg text-black" />

        <input name="productionYear" value={form.productionYear} onChange={handleChange} placeholder="Production Year"
          className="w-full mb-3 p-2 rounded-lg text-black" />

        <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight"
          className="w-full mb-3 p-2 rounded-lg text-black" />

        <input name="mainGun" value={form.mainGun} onChange={handleChange} placeholder="Main Gun"
          className="w-full mb-3 p-2 rounded-lg text-black" />

        <input name="crew" value={form.crew} onChange={handleChange} placeholder="Crew"
          className="w-full mb-3 p-2 rounded-lg text-black" />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-3 p-2 rounded-lg text-black"
          rows={5}
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