import { useState } from "react";
import { useTokens } from "../stores/TokenStore";
import api from "../utils/axios"; // Axios baseURL: http://localhost:5177/api
import { useNavigate, Link, replace } from "react-router-dom";
import { useDarkmode } from "../stores/DarkModeStore";

const Login = () => {
  const { setAccessToken, setRefreshToken } = useTokens();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

const handleLogin = async () => {
    try {
        const { data } = await api.post("/Auth/login", formData); // baseURL + endpoint
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/", { replace: true });
    } catch (error) {
        console.error("Login error:", error);
    } 
};


  return (
    <div className={`w-full h-screen flex justify-center items-center ${
      isDarkmodeActive ? "bg-gray-100 text-black" : "bg-slate-900 text-white"
    }`}>
      <div className="w-[350px] p-8 bg-white rounded-lg shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-yellow-400 text-black font-bold py-2 rounded"
        >
          Login
        </button>

        <p className="text-center text-sm text-black">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;