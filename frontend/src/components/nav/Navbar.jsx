import { NavLinkTransparent } from "./NavLinkTransparent";
export default function Navbar() {
    return (
        <nav className="bg-indigo-900 px-4 py-5 lg:px-9 flex justify-between items-center">
            <div className="text-white text-xl font-bold font-serif">Notesapp</div>
            <div className="space-x-3">
                <NavLinkTransparent text="Sign In" to ="/login"/>
            </div>
        </nav>
    );
}