import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function Generals() {
  const [generals, setGenerals] = useState([]);

  useEffect(() => {
    api.get("/generals")
      .then(res => setGenerals(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Generals</h2>

      {generals.map(general => (
        <div key={general.id}>
          <h3>{general.name}</h3>
          <p>Country: {general.country}</p>

          <Link to={`/generals/${general.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}