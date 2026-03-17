import { useState, useEffect } from "react";
import { useTokens } from "../stores/TokenStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDarkmode } from "../stores/DarkModeStore";

const Headers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { accessToken } = useTokens();
  const navigate = useNavigate();
  const location = useLocation();
  const {isDarkmodeActive, toggleDarkmode} = useDarkmode()

 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    setSearchTerm(search);
  }, [location.search]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.length >= 3) { 
        navigate(`?search=${searchTerm}`);
      }
    }
  };

  useEffect(() => {
    if (isDarkmodeActive) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkmodeActive])

  return (
    <div className="flex items-center p-5 w-full">
      
      <div className="flex justify-center items-center gap-5">
        <Link to="/" className="hover:text-black">Home</Link>
        <Link to="/write-blog">Write a blog</Link>
        <Link to="/my-blogs">My Blogs</Link>
        <p className="mr-10">Contact</p>
      </div>

      <div className="flex items-center gap-5">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          className="border border-zinc-300 p-3 min-w-[300px] rounded-lg"
        />
        {!accessToken && (
          <Link
            to="/login"
            className="bg-[#141624] px-4 py-2 rounded font-bold text-white"
          >
            Sign In
          </Link>
        )}
         <div className="flex items-center">
      <div
        onClick={toggleDarkmode}
        className={`w-14 h-7 px-1 flex items-center rounded-full cursor-pointer transition-all
          ${isDarkmodeActive ? "bg-gray-800 justify-end" : "bg-gray-300 justify-start"}
        `}
      >
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-sm">
          {isDarkmodeActive ? "🌙" : "☀️"}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Headers;
