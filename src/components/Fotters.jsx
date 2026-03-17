import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../utils/axios"
import { useDarkmode } from "../stores/DarkModeStore";

const Fotters = () => {
     const {isDarkmodeActive} = useDarkmode() 




    return (
        <footer className={`w-full bg-[#F6F6F7] mt-10 ${isDarkmodeActive ? "bg-white text-black" : "bg-slate-900 text-white"}`}>
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

            </div>

        </footer>
    )
}

export default Fotters
