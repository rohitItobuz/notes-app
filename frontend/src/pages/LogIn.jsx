import axios from "axios";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Form from "../components/form/Form";
import { logInSchema } from "../validator/userValidationSchema";

const inputs = [
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
];

export default function LogIn() {
  const navigate = useNavigate();
  const onSubmit = async (data, e) => {
    e.target.reset();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data
      );
      const result = response.data;
      if (result.success) {
        const { accessToken, refreshToken, username, email, profile, role } =
          result.data;
        localStorage.clear();
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ username, email, profile, role })
        );
        navigate("/dashboard");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      error.status === 429 && toast.error(error.response.data);
      console.error(error);
    }
  };
  return (
    <Form
      heading="Login"
      inputs={inputs}
      onSubmit={onSubmit}
      btnText="LOGIN"
      schema={logInSchema}
      subHeading="Don't"
      text="Start your journey in one click"
      linkText="SIGN UP"
      to="/register"
    />
  );
}
