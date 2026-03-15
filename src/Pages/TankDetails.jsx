import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

export default function TankDetails() {
  const { id } = useParams();
  const [tank, setTank] = useState(null);

  useEffect(() => {
    api.get(`/tanks/${id}`)
      .then(res => setTank(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!tank) return <p>Loading...</p>;

  return (
    <div>
      <h2>{tank.name}</h2>
      <p>Country: {tank.country}</p>
      <p>Type: {tank.type}</p>
      <p>Production Year: {tank.productionYear}</p>
      <p>Weight: {tank.weight}</p>
      <p>Main Gun: {tank.mainGun}</p>
      <p>Crew: {tank.crew}</p>
      <p>{tank.description}</p>
    </div>
  );
}