import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function HomePage() {
  return (
    <div>
      <h1>Tank Wiki</h1>

      <nav>
        <Link to="/tanks">Tanks</Link> |{" "}
        <Link to="/generals">Generals</Link> |{" "}
        <Link to="/tank-officers">Tank Officers</Link>
      </nav>
    </div>
  );
}
