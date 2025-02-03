
export const Input = ({register,name,type,icon,label=name}) => {
  return (
    <div className="relative flex gap-3 items-center border-solid border-2 form-input-container rounded-md px-3">
      {icon}
      <input
      type={type}
        className=" outline-none form-input z-10 bg-transparent p-2 w-full"
        placeholder=" " 
        autoComplete="off"
        {...register(name)}
      />
      <label className="absolute text-sm form-label left-9 bg-white text-zinc-500 px-3">
        {label}
      </label>
    </div>
  );
};
