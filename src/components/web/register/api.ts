import axiosInstance from "../../../router/communicator";

export const register = async (user: any) => {
  try {
    const response = await axiosInstance.post("/auth/signup", user);
    return response;
  } catch (error: any) {
    return error;
  }
};
