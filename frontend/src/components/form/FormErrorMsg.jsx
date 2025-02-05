import { MdError } from "react-icons/md";
export const FormErrorMsg = ({ msg }) => {
  return (
    <div className="flex gap-1 absolute top-12">
        <MdError color="#E7000B"/>
      <span className="text-red-600 text-xs">{msg}</span>
    </div>
  );
};
