import axiosInstance from "../config/axios";

export const getAllUsers = async (setUserList) => {
  try {
    const response = await axiosInstance.get("/user/getall-users");
    const result = response.data;
    result.success ? setUserList(result.data) : setUserList([]);
  } catch (error) {
    console.error(error);
  }
};
