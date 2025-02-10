import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { EmailVerification } from "../components/EmailVerification";

const EmailVerify = () => {
  const { token } = useParams();
  const [res, setRes] = useState(null);
  useEffect(() => {
    const verify = async () => {
      const response = await axios.get("http://localhost:3000/user/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRes(response.data);
    };
    if (res === null) verify();
    console.log(res);
  }, []);
  return res ? <EmailVerification {...res} /> : <h1>Loading...</h1>;
};

export default EmailVerify;
