import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDarkmode } from "../stores/DarkModeStore";

export default function TankOfficers() {
  const [officers, setOfficers] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
const [country, setCountry] = useState("");

  const { tankId } = useParams();
  const { isDarkmodeActive } = useDarkmode();

  useEffect(() => {
    if (!tankId) return;

    api.get(`/TankOfficer/tank/${tankId}?page=${page}&pageSize=${pageSize}&country=${country}`)
      .then(res => {
        setOfficers(res.data.data.items);
        setTotalPages(res.data.data.totalPage);
      })
      .catch(err => console.error(err));
  }, [tankId, page, pageSize, country]);

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
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
      
      {/* 🔥 Title */}
      <h2 className="text-4xl font-bold text-center mb-10">
        🎖 Tank Officers
      </h2>



      {/* 💎 GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {officers.map(officer => (
          <Link
            key={officer.id}
            to={`/tankOfficers/${officer.id}`}
            className="group bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-103 hover:shadow-blue-500/30 transition duration-300"
          >
            {/* 🖼 Image */}
            <div className="h-48 bg-gray-300 overflow-hidden ">
              {officer.imageUrl ? (
                <img
                  src={officer.imageUrl}
                  alt={officer.fullName}
                  className=" object-cover max-h-87.5 w-fit group-hover:scale-103 transition duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span>No Image</span>
                </div>
              )}
            </div>

            {/* 📋 Info */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-bold">
                {officer.fullName}
              </h3>

              <p className="text-sm text-gray-400">
                Age: {officer.age}
              </p>

              <div className="mt-2 bg-blue-400 text-black text-center py-1 rounded-lg font-semibold group-hover:bg-blue-500 transition">
                View Details
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ❌ Empty */}
      {officers.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          No officers found...
        </p>
      )}

      {/* 🔥 Pagination */}
      <div className="flex justify-center items-center gap-6 mt-10">
        
        {/* ⬅ Prev */}
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-5 py-2 bg-gray-300 text-black rounded-lg font-semibold disabled:opacity-40 hover:scale-105 transition"
        >
          ⬅ Prev
        </button>

        {/* 📄 Page info */}
        <span className="font-bold text-lg">
          {page} / {totalPages}
        </span>

        {/* ➡ Next */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="px-5 py-2 bg-gray-300 text-black rounded-lg font-semibold disabled:opacity-40 hover:scale-105 transition"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}