import axiosInstance from "../../../router/index.ts";
import { toast } from "react-toastify";

export const login = async (user: any) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", user);
    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
