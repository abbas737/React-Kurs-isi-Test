import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AdminTankOfficers() {
  const [officers, setOfficers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    rank: "",
    birthDate: "",
    deathDate: "",
    biography: "",
    imageUrl: "",
    tankId: ""
  });

  const navigate = useNavigate();

  // 🔥 GET ALL
  const getOfficers = async () => {
    try {
      const { data } = await api.get("/TankOfficer/Tank/3?page=1&pageSize=100");
      setOfficers(data.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOfficers();
  }, []);

  // 🔥 CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      const payload = {
        fullName: form.fullName,
        rank: form.rank,
        birthDate: form.birthDate,
        deathDate: form.deathDate || null,
        biography: form.biography,
        imageUrl: form.imageUrl,
        tankId: Number(form.tankId)
      };

      if (editingId) {
        await api.put(`/TankOfficer/${editingId}`, payload);
      } else {
        await api.post("/TankOfficer", payload);
      }

      resetForm();
      getOfficers();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    try {
      if (!confirm("Delete this officer?")) return;

      await api.delete(`/TankOfficer/${id}`);
      setOfficers(prev => prev.filter(x => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };



  const handleEdit = async (officer) => {
    try {
      const { data } = await api.get(`/TankOfficer${officer.id}`);
      const o = data.data;

      setForm({
        fullName: o.fullName ?? "",
        rank: o.rank ?? "",
        birthDate: o.birthDate ? o.birthDate.split("T")[0] : "",
        deathDate: o.deathDate ? o.deathDate.split("T")[0] : "",
        biography: o.biography ?? "",
        imageUrl: o.imageUrl ?? "",
        tankId: o.tankId ?? ""
      });

      setEditingId(o.id);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      rank: "",
      birthDate: "",
      deathDate: "",
      biography: "",
      imageUrl: "",
      tankId: ""
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-yellow-400 font-bold">
          🪖 Admin Tank Officers
        </h1>

        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 bg-white/10 rounded-lg"
        >
          ⬅ Back
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white/5 p-6 rounded-xl mb-10 grid gap-3">

        <input placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input placeholder="Rank"
          value={form.rank}
          onChange={(e) => setForm({ ...form, rank: e.target.value })}
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
          {editingId ? "Update Officer" : "Create Officer"}
        </button>
      </div>


      <table className="w-full border border-white/10">
        <thead className="bg-white/10">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Rank</th>
            <th className="p-2">TankId</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {officers.map((o) => (
            <tr key={o.id} className="border-t border-white/10">
              <td className="p-2">{o.fullName}</td>
              <td className="p-2">{o.rank}</td>
              <td className="p-2">{o.tankId}</td>

              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(o)}
                  className="bg-blue-500 px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(o.id)}
                  className="bg-red-500 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}