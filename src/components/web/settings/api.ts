import axiosInstance from "../../../router/communicator";

export const changePassword = async (values: any) => {
  try {
    const response = await axiosInstance.patch("/user/updatePassword", values);
    return response;
  } catch (error: any) {
    return error;
  }
};