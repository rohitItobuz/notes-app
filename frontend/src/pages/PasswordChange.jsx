import axiosInstance from "../config/axios";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ChangePasswordSchema } from "../validator/userValidationSchema";
import Form from "../components/form/Form";

const inputs = [
  {
    inputName: "oldPassword",
    type: "password",
    icon: <FaLock />,
    label: "old password",
  },
  {
    inputName: "newPassword",
    type: "password",
    icon: <FaLock />,
    label: "new password",
  },
  {
    inputName: "confirmPassword",
    type: "password",
    icon: <FaLock />,
    label: "confirm new password",
  },
];

export const PasswordChange = () => {
  const navigate = useNavigate();
  const onSubmit = async (data, e) => {
    e.target.reset();

    try {
      const response = await axiosInstance.put("user/change-password", data);
      const result = response.data;
      if (result.success) {
        navigate("/profile");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      heading="Change Password"
      inputs={inputs}
      onSubmit={onSubmit}
      btnText="UPDATE"
      schema={ChangePasswordSchema}
    />
  );
};
