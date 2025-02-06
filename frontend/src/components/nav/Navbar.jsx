import { NavLinkTransparent } from "./NavLinkTransparent";
export default function Navbar() {
  return (
    <nav className="bg-indigo-900 px-4 py-5 lg:px-9 flex justify-between items-center">
      <p className="text-white text-xl font-bold font-serif">Notesapp</p>
      <NavLinkTransparent text="Sign In" to="/login" />
    </nav>
  );
}
