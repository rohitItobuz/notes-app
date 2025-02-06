import default_profile_pic from  "../../assets/default_profile_pic.webp"
export const DashboardNavbar = () => {
    const {username} = JSON.parse(localStorage.getItem("userDetails"));
    return (
        <nav className="bg-indigo-900 p-4 lg:px-9 flex justify-between items-center">
            <div className="text-white text-xl font-bold font-serif">Notesapp</div>
            <button className="max-w-32 sm:max-w-48 flex items-center gap-1">
                <span className="text-cyan-100 font-semibold">Hi,</span>
                <span className="truncate text-white font-semibold">{username}</span>
                <img className="w-12 rounded-full ms-2" src={default_profile_pic} alt="profile" />
            </button>
        </nav>
    );
}
