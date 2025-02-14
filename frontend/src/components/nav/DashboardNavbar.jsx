import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/UserContext";
import default_profile_pic from "../../assets/default_profile_pic.webp";
import { NavLinkText } from "./NavLinkText";

export const DashboardNavbar = () => {
  const { setUserDetails, userDetails } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    userData && userData !== "" && setUserDetails(JSON.parse(userData));
  }, []);

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
      <button
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        className="text-white focus:outline-none md:hidden"
      >
        {isMobileMenuOpen ? <RxCross1 size={25} /> : <HiMenuAlt3 size={28} />}
      </button>

      {isMobileMenuOpen && (
        <div className=" w-full flex flex-col md:flex-row justify-between absolute top-16 bg-indigo-900 left-0 z-30 p-5 md:p-0 gap-4 md:static md:w-1/2 md:items-center">
          {userDetails.role === "admin" ? (
            <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
              <NavLinkText text="Users" to="/admin" />
              <NavLinkText text="Dashboard" to="/dashboard" />
            </div>
          ) : (
            <span></span>
          )}
          <NavLink
            to="/profile"
            className="flex items-center cursor-pointer w-fit"
          >
            <span className="text-cyan-100 font-semibold">Hi, </span>
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
