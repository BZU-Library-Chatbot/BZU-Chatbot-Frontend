import axiosInstance from "../../../router/communicator";

export const login = async (user: any) => {
  try {
    const response = await axiosInstance.post("/auth/login", user);
    return response;
  } catch (error: any) {
    return error;
  }
};
