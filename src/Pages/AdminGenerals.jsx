import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function AdminGenerals() {
  const [generals, setGenerals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { tankId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    birthDate: "",
    deathDate: "",
    biography: "",
    description: "",
    imageUrl: "",
    tankId: ""
  });

 


  const getGenerals = async () => {
    try {
      const { data } = await api.get(`/General/tank/${tankId}?page=1&pageSize=100`);
      console.log("API RESULT:", data.data.items);
      setGenerals(data.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  if (tankId) {
    getGenerals();
  }
}, [tankId]);


const handleSubmit = async () => {
  try {
    const payload = {
      fullName: form.fullName,
      birthDate: form.birthDate,
      deathDate: form.deathDate || null,
      biography: form.biography,
      description: form.description,
      imageUrl: form.imageUrl,
      tankId: Number(form.tankId)
    };

    if (editingId) {
      await api.put(`/General/${editingId}`, payload); 
    } else {
      await api.post("/General", payload); // CREATE
    }

    resetForm();
    getGenerals();
  } catch (err) {
    console.error(err);
  }
};


const handleDelete = async (id) => {
  try {
    if (!confirm("Delete this general?")) return;

    await api.delete(`/General/${id}`);


    setGenerals(prev => prev.filter(x => x.id !== id));
  } catch (err) {
    console.error(err);
  }
};


 const handleEdit = async (general) => {
  try {
    const { data } = await api.get(`/General/${general.id}`);
    

    const g = data.data;

    setForm({
      fullName: g.fullName ?? "",
      birthDate: g.birthDate ? g.birthDate.split("T")[0] : "",
      deathDate: g.deathDate ? g.deathDate.split("T")[0] : "",
      biography: g.biography ?? "",
      description: g.description ?? "",
      imageUrl: g.imageUrl ?? "",
      tankId: g.tankId ?? ""
    });

    setEditingId(g.id);

  } catch (err) {
    console.error(err);
  }
};
  const resetForm = () => {
    setForm({
      fullName: "",
      birthDate: "",
      deathDate: "",
      biography: "",
      description: "",
      imageUrl: "",
      tankId: ""
    });

    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">


      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-yellow-400 font-bold">
          🎖 Admin Generals
        </h1>

        <button
        onClick={() => navigate(-1)}
        className="mb-6 px-5 py-2 rounded-xl bg-white/5 border border-white/10
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>
      </div>


      <div className="bg-white/5 p-6 rounded-xl mb-10 grid gap-3">

        <input placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input type="date"
          value={form.birthDate}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
        />

        <input type="date"
          value={form.deathDate}
          onChange={(e) => setForm({ ...form, deathDate: e.target.value })}
        />

        <input placeholder="Biography"
          value={form.biography}
          onChange={(e) => setForm({ ...form, biography: e.target.value })}
        />

        <input placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <input placeholder="Tank Id"
          value={form.tankId}
          onChange={(e) => setForm({ ...form, tankId: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="bg-yellow-400 text-black py-2 rounded font-bold"
        >
          {editingId ? "Update General" : "Create General"}
        </button>
      </div>


<table className="w-full border border-white/9 text-left">
  <thead className="bg-white/10">
    <tr>
      <th className="p-2">Name</th>
      <th className="p-2">BirthDate</th>
      <th className="p-2">DeathDate</th>
      <th className="p-2">TankId</th>
      <th className="p-2">Actions</th> 
    </tr>
  </thead>

  <tbody>
    {generals.map((g) => (
      <tr key={g.id} className="border-t border-white/10">
        <td className="p-2">{g.fullName}</td>
        <td className="p-2">{g.birthDate}</td>
        <td className="p-2">{g.deathDate}</td>
        <td className="p-2 pl-7">{g.tankId}</td>

        <td className="p-2 pl">
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(g)}
              className="bg-blue-500 px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(g.id)}
              className="bg-red-500 px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}