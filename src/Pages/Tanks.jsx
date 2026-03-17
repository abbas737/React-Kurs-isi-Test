import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

export default function Tanks() {
  const [tanks, setTanks] = useState([]);

  useEffect(() => {
    const getTanks = async () => {
      try {
        const res = await api.get("/tanks"); // GET /api/tanks
        setTanks(res.data.data.items);      // <- PagedResult<TankListDto> içindən Items
      } catch (err) {
        console.error("Error fetching tanks:", err);
      }
    };

    getTanks();
  }, []);

  return (
    <div>
      <h2>Tanks</h2>

      {tanks.map(tank => (
        <div key={tank.id}> {/* backend-də Id */}
          <h3>{tank.name}</h3>       {/* backend-də Name */}
          <p>Country: {tank.country}</p> {/* backend-də Country */}
          <p>Type: {tank.type}</p>       

          {tank.imageUrl && (
            <img src={tank.imageUrl} alt={tank.name} width={200} />
          )}

          <Link to={`/tank/${tank.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}