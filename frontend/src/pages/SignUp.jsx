import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validator/userValidationSchema";
import { FromErrorMsg } from "../components/FormErrorMsg";
import "../components/FormStyle.scss";
import { Input } from "../components/FormInput";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button } from "../components/Button";
import axios from "axios";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data, e) => {
    console.log(data);
    const { email, password, username } = data;
    e.target.reset();
    const newData = JSON.stringify({ email, password, username });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/user/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: newData,
    };
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl">Create account</h1>
      <form
        className="flex flex-col gap-7 w-5/6 md:w-96 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-full">
          <Input
            register={register}
            name="username"
            type="text"
            icon={<FaUser />}
          />
          {errors.username && <FromErrorMsg msg={errors.username.message} />}
        </div>
        <div className="relative w-full">
          <Input
            register={register}
            name="email"
            type="email"
            icon={<MdEmail />}
          />
          {errors.email && <FromErrorMsg msg={errors.email.message} />}
        </div>
        <div className="relative w-full">
          <Input
            register={register}
            name="password"
            type="password"
            icon={<FaLock />}
          />
          {errors.password && <FromErrorMsg msg={errors.password.message} />}
        </div>
        <div className="relative w-full">
          <Input
            register={register}
            name="confirmPassword"
            label="confirm password"
            type="password"
            icon={<FaLock />}
          />
          {errors.confirmPassword && (
            <FromErrorMsg msg={errors.confirmPassword.message} />
          )}
        </div>
        <Button text="REGISTER" />
      </form>
    </>
  );
}
