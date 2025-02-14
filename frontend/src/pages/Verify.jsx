import axios from "axios";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";

import Form from "../components/form/Form";
import { VerifySchema } from "../validator/userValidationSchema";

const onSubmit = async (data, e) => {
  e.target.reset();

  try {
    const response = await axios.post("http://localhost:3000/user/email", data);
    const result = response.data;
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
  } catch (error) {
    error.status === 429 && toast.error(error.response.data);
    console.error(error);
  }
};

const inputs = [
  {
    inputName: "email",
    type: "email",
    icon: <MdEmail />,
  },
];

export default function Verify() {
  return (
    <Form
      heading="Verify"
      inputs={inputs}
      onSubmit={onSubmit}
      btnText="VERIFY"
      schema={VerifySchema}
      subHeading="Don't"
      text="Start your journey in one click"
      linkText="SIGN UP"
      to="/register"
    />
  );
}
