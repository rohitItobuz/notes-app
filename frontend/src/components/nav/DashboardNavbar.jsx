import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import default_profile_pic from "../../assets/default_profile_pic.webp";
import { UserContext } from "../../context/UserContext";

export const DashboardNavbar = () => {
  const { userDetails } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(true);

  const checkWindowSize = () => {
    window.innerWidth >= 768
      ? setMobileMenuOpen(true)
      : setMobileMenuOpen(false);
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <nav className="bg-indigo-900 p-4 lg:px-9 flex justify-between items-center">
      <div className="text-white text-xl font-bold font-serif">Notesapp</div>
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className=" w-full flex flex-col md:flex-row justify-between absolute top-16 bg-indigo-900 left-0 z-30 p-5 md:p-0 gap-4 md:static md:w-1/2 md:items-center">
          <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
            <NavLink
              to="/users"
              className="block text-white hover:text-cyan-300"
            >
              Users
            </NavLink>
            <NavLink
              to="/dashboard"
              className="block text-white hover:text-cyan-300"
            >
              Dashboard
            </NavLink>
          </div>
          <NavLink to="/profile" className="flex items-center cursor-pointer w-fit">
            <span className="text-cyan-100 font-semibold">Hi,</span>
            <span className="text-white font-semibold me-2">
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
        </div>
      )}
    </nav>
  );
};
