import { useState } from "react";
import { useTokens } from "../stores/TokenStore";
import api from "../utils/axios"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { setAccessToken, setRefreshToken } = useTokens();
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    try {
      const { data } = await api.post("/Auth/register", formData);

      setAccessToken(null);   
      setRefreshToken(null); 


      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-linear-to-br from-slate-900 via-slate-800 to-black text-white px-4">

      {/* 🔥 CARD */}
      <div className="w-full max-w-md p-8 rounded-2xl 
      bg-white/5 backdrop-blur-xl border border-white/10 
      shadow-2xl flex flex-col gap-5">

        {/* 🪖 Title */}
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Create Account
        </h2>

        {/* 👤 Username */}
        <input
          type="text"
          placeholder="Username"
          value={formData.userName}
          onChange={(e) => handleInputChange("userName", e.target.value)}
          className="p-3 rounded-xl bg-black/40 border border-white/10 
          focus:outline-none focus:border-yellow-400 transition"
        />

        {/* 📧 Email */}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="p-3 rounded-xl bg-black/40 border border-white/10 
          focus:outline-none focus:border-yellow-400 transition"
        />

        {/* 🔑 Password */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className="p-3 rounded-xl bg-black/40 border border-white/10 
          focus:outline-none focus:border-yellow-400 transition"
        />

        {/* 🔐 Button */}
        <button
          onClick={handleRegister}
          className="mt-2 py-3 rounded-xl font-bold 
          bg-linear-to-r from-yellow-400 to-orange-500 
          text-black hover:from-yellow-300 hover:to-orange-400 
          transition shadow-lg hover:shadow-yellow-500/40"
        >
          Register
        </button>

        {/* 🔗 Login */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;