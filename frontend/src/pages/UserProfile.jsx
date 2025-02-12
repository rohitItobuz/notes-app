import { useContext } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { LuUserPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios";
import { Button } from "../components/Button";
import { UserContext } from "../context/UserContext";
import { NavLinkSolid } from "../components/nav/NavLinkSolid";
import { FormErrorMsg } from "../components/form/FormErrorMsg";
import default_profile_pic from "../assets/default_profile_pic.webp";
import { changeUsernameSchema } from "../validator/userValidationSchema";

export const UserProfile = () => {
  const {
    userDetails,
    uploadProfilePic,
    changeUsername,
    editUsername,
    setEditUsername,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changeUsernameSchema),
  });

  const logout = async (count) => {
    try {
      const response = await axiosInstance.delete(`user/logout-${count}`);
      const result = response.data;
      if (result.success) {
        toast.success(result.message);
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center p-2">
      <div className="bg-white shadow-lg rounded-lg p-6 bg-gradient-to-r from-rose-100 to-blue-100 border-gray-300 border">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer relative">
            <img
              src={
                userDetails.profile === ""
                  ? default_profile_pic
                  : userDetails.profile.replace('http:/','http://')
              }
              className="w-48 h-48 rounded-full border border-gray-300 object-cover"
              alt="Profile"
            />
            <input type="file" className="hidden" onChange={uploadProfilePic} />
            <div className="absolute bottom-0 right-3 bg-blue-500 text-white p-2 rounded-full text-xs">
              <LuUserPen size={20} />
            </div>
          </label>
        </div>

        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold">{userDetails.username}</h2>
          <p className="text-gray-500 text-sm">{userDetails.email}</p>
          {editUsername && (
            <form onSubmit={handleSubmit(changeUsername)}>
              <div
                className={`relative flex gap-3 items-center border-solid border-2 form-input-container rounded-md px-3 mt-3 mb-6 ${
                  errors.username ? "border-red-500" : ""
                }`}
              >
                <FaUser />
                <input
                  type="text"
                  className="outline-none form-input z-10 bg-transparent p-2 w-full"
                  placeholder=" "
                  autoComplete="off"
                  {...register("username")}
                />
                <label className="absolute text-sm form-label left-9 bg-gradient-to-r from-rose-100 to-rose-50 text-zinc-500 px-3">
                  New username
                </label>
              {errors.username && (
                <FormErrorMsg msg={errors.username.message} />
              )}
              </div>

              <Button text={"UPDATE"} />
            </form>
          )}
        </div>

        <div className="mt-6 flex justify-center items-center gap-5">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={() => setEditUsername(!editUsername)}
          >
            Change Username
          </button>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={() => navigate("/password")}
          >
            Change Password
          </button>
        </div>

        <div className="mt-6">
          <button
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            onClick={() => logout("one")}
          >
            Logout from this Device
          </button>
          <button
            className="w-full mt-3 bg-red-700 text-white py-2 rounded-md hover:bg-red-800"
            onClick={() => logout("all")}
          >
            Logout from All Devices
          </button>
        </div>
        <div className="mt-8 text-center">

        <NavLinkSolid text="Go to dashboard &#10142;" to="/dashboard"/>
        </div>
      </div>
    </div>
  );
};