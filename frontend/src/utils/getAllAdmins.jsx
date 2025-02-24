import axiosInstance from "../config/axios";

export const getAllAdmins = async (setUserList) => {
  try {
    const response = await axiosInstance.get("/user/get-admins");
    const result = response.data;
    result.success ? setUserList(result.data) : setUserList([]);
  } catch (error) {
    console.error(error);
  }
};