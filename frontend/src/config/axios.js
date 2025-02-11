import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
    },
});

axiosInstance.interceptors.response.use(async (response) => {
    if (response.data.status !== 401) return response;
    const originalRequest = response.config;
    if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const response = await axios.get(
                "http://localhost:3000/user/regenerate-token",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                    },
                }
            );
            if (response.data.success) {
                const { accessToken } = response.data;
                localStorage.setItem("accessToken", accessToken);
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userDetails");
                window.location.href = "/login";
            }
        } catch (error) {
            console.log(error);
        }
    }
});

export default axiosInstance;
