import { useState } from "react";
import { useTokens } from "../stores/TokenStore";
import api from "../utils/axios"; 
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const { setAccessToken, setRefreshToken, setRole } = useTokens();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
  try {
    const { data } = await api.post("/Auth/login", formData);

    const accessToken = data.data.accessToken;
    const refreshToken = data.data.refreshToken;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    // 🔥 ROLE çıxart
const decoded = jwtDecode(accessToken);
console.log(decoded);

const roles =
  decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

const role = Array.isArray(roles) ? roles[0] : roles;

setRole(role);

   if (role === "Admin") {
  navigate("/admin");
} else {
  navigate("/");
}
  } catch (error) {
    console.error("Login error:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white px-4">

      <div className="w-full max-w-md p-8 rounded-2xl 
      bg-white/5 backdrop-blur-xl border border-white/10 
      shadow-2xl flex flex-col gap-5">

        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Tank Wiki Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="p-3 rounded-xl bg-black/40 border border-white/10 
          focus:outline-none focus:border-yellow-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className="p-3 rounded-xl bg-black/40 border border-white/10 
          focus:outline-none focus:border-yellow-400 transition"
        />

        <button
          onClick={handleLogin}
          className="mt-2 py-3 rounded-xl font-bold 
          bg-gradient-to-r from-yellow-400 to-orange-500 
          text-black hover:from-yellow-300 hover:to-orange-400 
          transition shadow-lg hover:shadow-yellow-500/40"
        >
          Login
        </button>


        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;