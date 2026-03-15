import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import Loading from "../components/Loading";

export default function GeneralDetails() {
  const { id } = useParams();
  const [general, setGeneral] = useState(null);

  useEffect(() => {
    api.get(`/generals/${id}`)
      .then(res => setGeneral(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!general) return <p>Loading...</p>;

  return (
    <div>
      <h2>{general.name}</h2>
      <p>Country: {general.country}</p>
      <p>{general.biography}</p>
    </div>
  );
}