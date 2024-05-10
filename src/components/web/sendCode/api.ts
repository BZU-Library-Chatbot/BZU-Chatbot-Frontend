import axiosInstance from "../../../router/communicator";

export const sendCode = async (email: any) => {
  try {
    const response = await axiosInstance.patch("/auth/sendCode", email);
    return response;
  } catch (error: any) {
    return error;
  }
};
