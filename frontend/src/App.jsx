import React, { useEffect } from "react";
import Home from "./pages/Home";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Onboarding, Profile } from "./pages";
import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";

import MedicalRecord from "./pages/records/index";
import SingleRecordDetails from "./pages/records/SingleRecordDetails";

const  App = () => {
    // Destructure values from usePrivy
    const { user, authenticated, ready, login } = usePrivy();
    // Get currentUser from context
    const {currentUser} = useStateContext();

    const navigate = useNavigate();
    
    useEffect(() => {
        // If the App is ready but not authenticated, and Trigger the login
        if(ready && !authenticated) {
            login();
        }
        // If the user is logged in but not authenticated in the app context, redirect to onboarding
        if (user && !currentUser) {
            navigate('/onboarding');
        }
    }, [ready, authenticated, user, currentUser, navigate, login]);

    // Show loading while privy is initializing
    if (!ready) {
        return <div className="flex items-center justify-center min-h-screen bg-[#13131a] text-white">Loading...</div>;
    }

    // Destruct these from privy
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
                    <Route path="/onboarding" element={<Onboarding/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/medical-records" element={<MedicalRecord/>} />
                    <Route path="/medical-records/:id" element={<SingleRecordDetails/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App;