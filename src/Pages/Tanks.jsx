import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDarkmode } from "../stores/DarkModeStore";

export default function Tanks() {
  const [tanks, setTanks] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const { isDarkmodeActive } = useDarkmode();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const getTanks = async () => {
    try {
      let url = `/Tank?Page=${page}&PageSize=6`;
      if (search.length >= 3) url += `&Search=${search}`;

      const { data } = await api.get(url);
      const paged = data.data;

      if (Array.isArray(paged.items)) {
        setTanks(prev =>
          page === 1 ? paged.items : [...prev, ...paged.items]
        );
        setHasMore(page < paged.totalPage);
      }
    } catch (err) {
      console.error("Error fetching tanks:", err);
    }
  };

  useEffect(() => {
    setTanks([]);
    setPage(1);
  }, [search]);

  useEffect(() => {
    getTanks();
  }, [page, search]);

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


      <h2 className="text-4xl font-bold mb-10 text-center tracking-wide">
        Tanks
      </h2>


      {search && (
        <p className="text-center mb-6 text-gray-400">
          Searching for: <span className="text-yellow-400">{search}</span>
        </p>
      )}


      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {tanks.map(tank => (
          <Link
            key={tank.id}
            to={`/tank/${tank.id}`}
            className="group bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-103 hover:shadow-yellow-500/30 transition duration-300"
          >

            <div className="h-48 w-full bg-gray-300 overflow-hidden">
  {tank.imageUrl ? (
    <img
      src={tank.imageUrl}
      alt={tank.name}
      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
    />
  ) : (
    <div className="flex items-center justify-center h-full">
      <span>No Image</span>
    </div>
  )}
</div>


            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-bold">{tank.name}</h3>

              <p className="text-sm text-gray-400">
                {tank.country} • {tank.type}
              </p>


              <div className="mt-2 bg-yellow-400 text-black text-center py-1 rounded-lg font-semibold group-hover:bg-yellow-500 transition">
                View Details
              </div>
            </div>
          </Link>
        ))}
      </div>


      {tanks.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          No tanks found...
        </p>
      )}


      {hasMore && tanks.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-6 py-2 bg-yellow-400 text-black rounded-xl font-bold hover:scale-105 hover:bg-yellow-500 transition shadow-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}