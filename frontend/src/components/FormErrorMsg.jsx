import { MdError } from "react-icons/md";
export const FromErrorMsg = ({ msg }) => {
  return (
    <div className="flex gap-2 absolute top-12">
        <MdError/>
      <span className="text-red-600 text-xs">{msg}</span>
    </div>
  );
};
