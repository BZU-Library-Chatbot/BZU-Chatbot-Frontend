import axiosInstance from "../../../router/index.ts";
import { toast } from "react-toastify";

export const register = async (user: any) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", user);
    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
