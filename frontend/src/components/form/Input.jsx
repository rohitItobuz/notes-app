import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Input = ({ inputFields, register, errors }) => {
  const { inputName, type, label, icon } = inputFields;
  const [dynamicType, setDynamicType] = useState(type);
  const [showPassword, toggleShowPassword] = useState(false);

  const togglePassword = () => {
    showPassword ? setDynamicType(type) : setDynamicType("text");
    toggleShowPassword(!showPassword);
  };

  return (
    <div
      className={`relative flex gap-3 items-center border-solid border-2 form-input-container rounded-md px-3 ${
        errors[inputName] ? "border-red-500" : ""
      }`}
    >
      {icon}
      <input
        type={dynamicType}
        className="outline-none form-input z-10 bg-transparent p-2 w-full"
        placeholder=" "
        autoComplete="off"
        {...register(inputName)}
      />
      <label className="absolute text-sm form-label left-9 bg-white text-zinc-500 px-3">
        {label || inputName}
      </label>
      {type === "password" && (
        <button type="button" onClick={togglePassword}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
};
