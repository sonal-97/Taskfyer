import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import { useUserContext } from "@/context/userContext";

function Sidebar() {
  const { logoutUser } = useUserContext();
  
  return (
    <div className="w-[20rem] mt-[5rem] h-screen fixed right-0 top-0 bg-[#f9f9f9] flex flex-col justify-between">
      {/* Profile Section */}
      <Profile />
      
      {/* Radial Chart Section */}
      <div className="mt-4 mx-6">
        <RadialChart />
      </div>

      {/* Sign Out Button - Always Visible in Bottom Left */}
      <button
        className="absolute bottom-6 left-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] 
                   hover:bg-[#3aafae] transition duration-200 ease-in-out"
        onClick={logoutUser}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Sidebar;
