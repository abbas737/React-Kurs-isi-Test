import { useState } from "react";
import { useTokens } from "../stores/TokenStore";
import api from "../utils/axios"; 
import { useNavigate, Link } from "react-router-dom";
import { useDarkmode } from "../stores/DarkModeStore";

const Register = () => {
  const { setAccessToken, setRefreshToken } = useTokens();
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const navigate = useNavigate();
  const { isDarkmodeActive } = useDarkmode();

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

const handleRegister = async () => {
    try {
        const { data } = await api.post("/Auth/register", formData);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/");
    } catch (error) {
        console.error("Register error:", error);
    }
};

  return (
    <div className={`w-full h-screen flex justify-center items-center ${
      isDarkmodeActive ? "bg-gray-100 text-black" : "bg-slate-900 text-white"
    }`}>
      <div className="w-[350px] p-8 bg-white rounded-lg shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-black">Register</h2>

        <input
          type="text"
          placeholder="userName"
          value={formData.name}
          onChange={(e) => handleInputChange("username", e.target.value)}
          className="border p-2 rounded"
        />

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
          onClick={handleRegister}
          className="bg-yellow-400 text-black font-bold py-2 rounded"
        >
          Register
        </button>

        <p className="text-center text-sm text-black">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;