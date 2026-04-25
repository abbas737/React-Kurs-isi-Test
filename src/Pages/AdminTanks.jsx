import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AdminTanks() {
  const [tanks, setTanks] = useState([]);
 const [form, setForm] = useState({
  name: "",
  country: "",
  type: "",
  productionYear: "",
  weight: "",
  mainGun: "",
  crew: "",
  description: "",
  imageUrl: "",
  videoUrl: ""
});
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // 🔥 GET ALL
  const getTanks = async () => {
    try {
      const { data } = await api.get("/Tank?Page=1&PageSize=100");
      setTanks(data.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTanks();
  }, []);

  const handleSubmit = async () => {
  try {
    const payload = {
      Name: form.name,
      Country: form.country,
      Type: form.type,
      ProductionYear: form.productionYear ? Number(form.productionYear) : null,
      Weight: form.weight ? Number(form.weight) : 0,
      MainGun: form.mainGun,
      Crew: form.crew ? Number(form.crew) : null,
      Description: form.description,
      ImageUrl: form.imageUrl,
      VideoUrl: form.videoUrl
    };

    if (editingId) {
      await api.put(`/Tank/${editingId}`, payload);
    } else {
      await api.post("/Tank", payload);
    }

    setEditingId(null);
    setForm({
      name: "",
      country: "",
      type: "",
      productionYear: "",
      weight: "",
      mainGun: "",
      crew: "",
      description: "",
      imageUrl: "",
      videoUrl: ""
    });

    getTanks(); // 🔥 ƏN VACİB

  } catch (err) {
    console.error(err);
  }
};

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this tank?")) return;

    try {
      await api.delete(`/Tank/${id}`);
      getTanks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 EDIT
const handleEdit = async (tank) => {
  try {
    const { data } = await api.get(`/Tank/${tank.id}`);

    const fullTank = data.data;

    setForm({
      name: fullTank.name ?? "",
      country: fullTank.country ?? "",
      type: fullTank.type ?? "",
      productionYear: fullTank.productionYear ?? "",
      weight: fullTank.weight ?? "",
      mainGun: fullTank.mainGun ?? "",
      crew: fullTank.crew ?? "",
      description: fullTank.description ?? "",
      imageUrl: fullTank.imageUrl ?? "",
      videoUrl: fullTank.videoUrl ?? ""
    });

    setEditingId(fullTank.id);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">


      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-yellow-400 font-bold">
          ⚙️ Manage Tanks
        </h1>

        <button
        onClick={() => navigate(-1)}
        className="mb-6 px-5 py-2 rounded-xl bg-white/5 border border-white/10
        hover:bg-white/10 hover:text-yellow-400 transition"
      >
        ← Back
      </button>
      </div>


      <div className="bg-white/5 p-6 rounded-xl mb-10 flex flex-col gap-4">

      <input
  placeholder="Name"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
  placeholder="Country"
  value={form.country}
  onChange={(e) => setForm({ ...form, country: e.target.value })}
/>

<input
  placeholder="Type"
  value={form.type}
  onChange={(e) => setForm({ ...form, type: e.target.value })}
/>

     <input placeholder="Production Year"
  value={form.productionYear ?? ""}
  onChange={(e) => setForm({ ...form, productionYear: e.target.value })}
/>

<input placeholder="Weight"
  value={form.weight}
  onChange={(e) => setForm({ ...form, weight: e.target.value })}
/>

<input placeholder="Main Gun"
  value={form.mainGun}
  onChange={(e) => setForm({ ...form, mainGun: e.target.value })}
/>

<input placeholder="Crew"
  value={form.crew}
  onChange={(e) => setForm({ ...form, crew: e.target.value })}
/>

<input placeholder="Image URL"
  value={form.imageUrl}
  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
/>

<input placeholder="Video URL"
  value={form.videoUrl}
  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
/>

<textarea placeholder="Description"
  value={form.description}
  onChange={(e) => setForm({ ...form, description: e.target.value })}
/>

        <button
          onClick={handleSubmit}
          className="bg-yellow-400 text-black py-2 rounded font-bold"
        >
          {editingId ? "Update Tank" : "Create Tank"}
        </button>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full text-left border border-white/10">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Country</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tanks.map(tank => (
              <tr key={tank.id} className="border-t border-white/10">
                <td className="p-3">{tank.name}</td>
                <td className="p-3">{tank.country}</td>
                <td className="p-3">{tank.type}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(tank)}
                    className="px-3 py-1 bg-blue-500 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(tank.id)}
                    className="px-3 py-1 bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}