import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadRequests = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/EditRequest?page=1&pageSize=10");
      setRequests(data.data.items);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = async (id) => {
    await api.post(`/EditRequest/approve/${id}`);
    loadRequests();
  };

  const handleReject = async (id) => {
    await api.post(`/EditRequest/reject/${id}`);
    loadRequests();
  };

  const handleDelete = async (id) => {
    await api.delete(`/EditRequest/${id}`);
    loadRequests();
  };

  const badgeColor = (status) => {
    if (status === "Pending") return "bg-yellow-500 text-black";
    if (status === "Approved") return "bg-green-500 text-white";
    return "bg-red-500 text-white";
  };

  const isChanged = (value) => {
    return value !== null && value !== undefined && value !== "";
  };

  // 🔥 FIXED SECTION
  const Section = ({ title, color, fields }) => {
    const changed = fields.filter(f => isChanged(f.value));
    const unchanged = fields.filter(f => !isChanged(f.value));

    if (changed.length === 0 && unchanged.length === 0) return null;

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className={`font-bold ${color}`}>{title}</h4>

          {changed.length > 0 && (
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
              {changed.length} change
            </span>
          )}
        </div>


        {changed.length > 0 && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 space-y-1">
            {changed.map((f, i) => (
              <p key={i} className="text-green-300">
                <b>{f.label}:</b> {f.value}
              </p>
            ))}
          </div>
        )}


        {unchanged.length > 0 && (
          <div className="mt-2 text-xs opacity-30">
            {unchanged.map((f, i) => (
              <p key={i}>
                <b>{f.label}:</b> -
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">

      

      <div className="flex justify-between items-center mb-6">

  <h2 className="text-3xl font-bold text-yellow-400">
    📩 Edit Requests
  </h2>

  <button
    onClick={() => navigate(-1)}
    className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 
    hover:bg-white/10 hover:text-yellow-400 transition"
  >
    ← Back
  </button>

</div>

      {loading && <p>Loading...</p>}

      <div className="grid md:grid-cols-2 gap-6">

        {requests.map((r) => (
          <div
            key={r.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-lg shadow-lg"
          >

            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm text-gray-400">
                  #{r.id} • {r.entityType}
                </p>
                <p className="text-xs text-gray-500">
                  Entity ID: {r.entityId}
                </p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor(r.status)}`}>
                {r.status}
              </span>
            </div>

           

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleApprove(r.id)}
                disabled={r.status !== "Pending"}
                className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-lg disabled:opacity-40"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(r.id)}
                disabled={r.status !== "Pending"}
                className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-lg disabled:opacity-40"
              >
                Reject
              </button>

              <button
                onClick={() => handleDelete(r.id)}
                className="flex-1 bg-gray-700 hover:bg-gray-800 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}