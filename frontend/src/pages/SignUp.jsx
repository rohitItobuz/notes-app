import axios from "axios";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

import Form from "../components/form/Form";
import { registerSchema } from "../validator/userValidationSchema";

const inputs = [
  {
    inputName: "username",
    type: "text",
    icon: <FaUser />,
  },
  {
    inputName: "email",
    type: "email",
    icon: <MdEmail />,
  },
  {
    inputName: "password",
    type: "password",
    icon: <FaLock />,
  },
  {
    inputName: "confirmPassword",
    type: "password",
    icon: <FaLock />,
    label: "confirm password",
  },
];

export default function SignUp() {
  const navigate = useNavigate();
  const onSubmit = async (data, e) => {
    e.target.reset();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        data
      );
      const result = response.data;
      result.success && navigate("/login");
      result.success
        ? toast.success(result.message)
        : toast.error(result.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      heading="Create account"
      inputs={inputs}
      onSubmit={onSubmit}
      btnText="REGISTER"
      schema={registerSchema}
      subHeading="Already"
      text="Sign in with your email & password"
      linkText="SIGN IN"
      to="/login"
    />
  );
}
