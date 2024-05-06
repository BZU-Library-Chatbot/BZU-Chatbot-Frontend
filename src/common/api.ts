import axiosInstance from "../router/communicator";

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response;
  } catch (error: any) {
    return error;
  }
};
