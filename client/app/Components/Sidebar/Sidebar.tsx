import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import { useUserContext } from "@/context/userContext";

const Sidebar: React.FC = () => {
  const { logoutUser } = useUserContext();

  return (
    <div className="w-[20rem] h-screen fixed right-0 top-0 bg-[#f9f9f9] flex flex-col justify-between p-6">
      {/* Profile Section */}
      <Profile />

      {/* Radial Chart Section */}
      <div className="mt-4">
        <RadialChart />
      </div>

      {/* Sign Out Button - Always Visible in Bottom Left */}
      <button
        className="absolute bottom-6 left-6 py-3 px-6 bg-[#EB4E31] text-white rounded-full 
                   hover:bg-[#3aafae] transition duration-200 ease-in-out shadow-lg"
        onClick={logoutUser}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
