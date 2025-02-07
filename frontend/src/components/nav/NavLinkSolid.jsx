import { NavLink } from "react-router-dom";
export const NavLinkSolid = ({ text, to, bg = "blue" }) => {
  return (
    <NavLink
      to={to}
      className={`text-white cursor-pointer w-fit py-3 px-5 bg-${bg}-700 hover:${bg}-800 transition-colors duration-300 font-bold rounded-3xl`}
    >
      {text}
    </NavLink>
  );
};
