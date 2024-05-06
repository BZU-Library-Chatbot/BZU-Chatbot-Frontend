import axiosInstance from "../../../router/communicator";

export const sendCode = async (value: any) => {
  try {
    const response = await axiosInstance.patch("/auth/sendCode", value);
    return response;
  } catch (error: any) {
    return error;
  }
};
