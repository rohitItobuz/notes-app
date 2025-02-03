import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data,e) => {
    console.log(data)
    e.target.reset();
};

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <input className="border-2 border-red-500 outline-none" {...register("email")} />
      <input className="border-2 border-red-500 outline-none" {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}
      <input className="bg-slate-400 cursor-pointer" type="submit" />
    </form>
  );
}
