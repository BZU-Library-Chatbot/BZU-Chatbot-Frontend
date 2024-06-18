import axiosInstance from "../../../router/communicator";

export const adminRegister = async (admin: any) => {
  try {
    const response = await axiosInstance.post("/auth/createAdmin", admin);
    return response;
  } catch (error: any) {
    return error;
  }
};
