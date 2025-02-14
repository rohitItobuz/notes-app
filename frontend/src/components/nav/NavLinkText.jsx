import { NavLink } from "react-router-dom";

export const NavLinkText = ({ text, to }) => {
  return (
    <NavLink
      to={to}
      className="block text-white hover:text-cyan-300 font-semibold"
      style={({ isActive }) => ({
        color: isActive ? "#67e8f9" : "white",
      })}
    >
      {text}
    </NavLink>
  );
};
