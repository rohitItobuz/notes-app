import { NavLinkSolid } from "../components/nav/NavLinkSolid";

export const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-2 gap-3 ">
            <h1 className="text-9xl font-bold text-blue-300 " style={{ WebkitTextStroke: "2px #2563eb" }}>404</h1>
            <p className="text-2xl font-medium text-gray-600">Oops! Page not found</p>
            <p className="mb-3 text-gray-500 text-center text-lg">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <NavLinkSolid text="HOME PAGE" to="/dashboard"/>
        </div>
    );
};
