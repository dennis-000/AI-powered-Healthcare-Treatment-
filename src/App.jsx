import React from "react";
import Home from "./pages/Home";
import {Route, Routes, useNavigate} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const  App = () => {
    return (
        <div className="relative flex min-h-screen flex-row bg-[#13131a] p-4">
            <div className="relative mr-10 hidden sm:flex">
                {/* Sidebar */}
                <Sidebar/>
            </div>

            <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5 color-[#ffff]">
                {/* Navbar */}
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App;