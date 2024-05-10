import axiosInstance from "../../../router/communicator";

export const forgetPassword = async (value: any) => {
  try {
    const response = await axiosInstance.patch("/auth/forgetPassword", value);
    return response;
  } catch (error: any) {
    return error;
  }
};
