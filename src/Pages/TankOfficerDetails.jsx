import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import Loading from "../components/Loading";

export default function TankOfficerDetails() {
  const { id } = useParams();
  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    api.get(`/tankofficers/${id}`)
      .then(res => setOfficer(res.data))
      .catch(err => console.error(err));
  }, [id]);

if (!officer) return <Loading />;

  return (
    <div>
      <h2>{officer.name}</h2>
      <p>{officer.biography}</p>
    </div>
  );
}