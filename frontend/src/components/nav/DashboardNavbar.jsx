import { useContext } from "react";
import { NavLink } from "react-router-dom";

import default_profile_pic from "../../assets/default_profile_pic.webp";
import { UserContext } from "../../context/UserContext";

export const DashboardNavbar = () => {
  const { userDetails } = useContext(UserContext);
  return (
    <nav className="bg-indigo-900 p-4 lg:px-9 flex justify-between items-center">
      <div className="text-white text-xl font-bold font-serif">Notesapp</div>
      <NavLink to="/profile" className="flex items-center cursor-pointer">
        <span className="text-cyan-100 font-semibold">Hi,</span>
        <span className="truncate text-white font-semibold me-2">
          {userDetails.username}
        </span>
        <img
          className="w-12 h-12 rounded-full ms-2"
          src={
            userDetails.profile === ""
              ? default_profile_pic
              : userDetails.profile.replace("http:/", "http://")
          }
          alt="profile"
        />
      </NavLink>
    </nav>
  );
};
