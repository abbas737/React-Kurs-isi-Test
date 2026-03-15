import { useState } from "react";
import { useTokens } from "../stores/TokenStore";

const Login = () => {
  const setAccessToken = useTokens((state) => state.setAccessToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // demo token
    setAccessToken("fake-token");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;