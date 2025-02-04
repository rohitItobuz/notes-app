import { NavLink } from 'react-router-dom';
export const NavLinkTransparent = ({text,to}) => {
    return <NavLink to={to} className="text-white cursor-pointer w-fit py-[11px] px-5 border-2 border-white hover:bg-white hover:text-blue-800 transition-colors duration-300 font-bold rounded-3xl box-border">{text}</NavLink>;
  };