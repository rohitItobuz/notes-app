import { NavLink } from "react-router-dom";

export const NavLinkSolid = ({ text, to, bg = "blue" }) => {
  return (
    <NavLink
      to={to}
      className={`text-white cursor-pointer w-fit py-3 px-5 ${
        bg === "red"
          ? "bg-red-700"
          : bg === "green"
          ? "bg-green-600"
          : "bg-blue-600"
      } 
      ${
        bg === "red"
          ? "hover:bg-red-800"
          : bg === "green"
          ? "hover:bg-green-800"
          : "hover:bg-blue-800"
      } transition-colors duration-300 font-bold rounded-3xl`}
    >
      {text}
    </NavLink>
  );
};
