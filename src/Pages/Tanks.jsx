import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

export default function Tanks() {
  const [tanks, setTanks] = useState([]);

  useEffect(() => {
    api.get("/tanks")
      .then(res => setTanks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Tanks</h2>

      {tanks.map(tank => (
        <div key={tank.id}>
          <h3>{tank.name}</h3>
          <p>Country: {tank.country}</p>

          <Link to={`/tanks/${tank.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}