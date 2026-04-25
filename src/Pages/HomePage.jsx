import { Link } from "react-router-dom";
import { useTokens } from "../stores/TokenStore";


export default function HomePage() {
  const { clearTokens } = useTokens();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">


      <header className="w-full bg-black/70 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center fixed top-0 z-50">
        <h1 className="text-2xl font-bold text-yellow-400">TankWiki</h1>

        <nav className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/tanks" className="hover:text-yellow-400">Tanks</Link>
          <Link to="/battle" className="hover:text-yellow-400">Battle</Link>
        </nav>

       <button
  onClick={clearTokens}
  className="flex items-center gap-2 px-5 py-2 rounded-xl 
  bg-red-500/90 backdrop-blur-md 
  hover:bg-red-600 hover:scale-105 
  active:scale-95
  transition-all duration-200 shadow-lg shadow-red-500/30"
>
  🔓 <span className="font-semibold">Logout</span>
</button>
      </header>


      <div
        className="h-screen flex flex-col justify-center items-center text-center px-4 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605902711622-cfb43c44367f')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            Tank Wiki
          </h1>

          <p className="text-gray-300 max-w-xl text-lg mb-8">
            Discover legendary tanks, generals, and epic war history.
          </p>

          <Link
  to="/tanks"
  className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold 
  bg-gradient-to-r from-yellow-400 to-yellow-500 text-black
  hover:from-yellow-300 hover:to-yellow-400
  shadow-lg shadow-yellow-500/30
  transition-all duration-300 hover:scale-105 active:scale-95"
>
  Explore Tanks
  <span className="group-hover:translate-x-1 transition">→</span>
</Link>
        </div>
      </div>


      <div className="py-16 px-6 bg-linear-to-b from-black to-slate-900">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Sections
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

          <Link to="/tanks" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
              hover:scale-105 transition duration-300 
              hover:shadow-yellow-500/30 backdrop-blur-lg">
              <h2 className="text-xl font-semibold group-hover:text-yellow-400">Tanks</h2>
              <p className="text-gray-400 text-sm mt-2">
                Explore tanks from WW2 to modern era.
              </p>
            </div>
          </Link>

          <Link to="/generals/tank/1" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
              hover:scale-105 transition duration-300 
              hover:shadow-purple-500/30 backdrop-blur-lg">
              <h2 className="text-xl font-semibold group-hover:text-green-500">Generals</h2>
              <p className="text-gray-400 text-sm mt-2">
                Learn about military leaders.
              </p>
            </div>
          </Link>

          <Link to="/tankOfficers/tank/1" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
              hover:scale-105 transition duration-300 
              hover:shadow-blue-500/30 backdrop-blur-lg">
              <h2 className="text-xl font-semibold group-hover:text-blue-400">Officers</h2>
              <p className="text-gray-400 text-sm mt-2">
                Discover tank commanders.
              </p>
            </div>
          </Link>

          <Link to="/battle" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
              hover:scale-105 transition duration-300 
              hover:shadow-red-500/30 backdrop-blur-lg">
              <h2 className="text-xl font-semibold group-hover:text-red-400">Battle</h2>
              <p className="text-gray-400 text-sm mt-2">
                Compare tanks and battles.
              </p>
            </div>
          </Link>

        </div>
      </div>


      <footer className="bg-black border-t border-white/10 text-center py-6 text-gray-400">
        <p>© 2026 TankWiki. All rights reserved.</p>
      </footer>

    </div>
  );
}