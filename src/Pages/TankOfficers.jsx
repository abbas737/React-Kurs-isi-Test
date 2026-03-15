import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

export default function TankOfficers() {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    api.get("/tankofficers")
      .then(res => setOfficers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Tank Officers</h2>

      {officers.map(officer => (
        <div key={officer.id}>
          <h3>{officer.name}</h3>

          <Link to={`/tank-officers/${officer.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}