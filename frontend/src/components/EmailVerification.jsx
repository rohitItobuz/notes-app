import { VscError } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import { NavLinkSolid } from "./nav/NavLinkSolid";

export const EmailVerification = ({ message, success, status }) => {
  return (
    <div className={`max-w-md border-2 border-gray-700 ${success? 'bg-green-100' : 'bg-red-100'} flex flex-col items-center gap-4 rounded-3xl p-3 mx-auto mt-28`}>
      <h1>
        {success ? (
          <FaRegCheckCircle size={100} color="green" />
        ) : (
          <VscError size={100} color="red" />
        )}
      </h1>
      <p className="text-center text-lg">{message}</p>
      {success ? (
        <NavLinkSolid text="LOGIN" to="/login" bg="green"/>
      ) : (
        <NavLinkSolid text="TRY AGAIN" to="/verify" bg="red"/>
      )}
    </div>
  );
};
