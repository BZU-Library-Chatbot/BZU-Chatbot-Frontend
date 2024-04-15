import axiosInstance from "../../../router/index.ts";
import { toast } from "react-toastify";

export const fetchSessions = async () => {
  try {
    const response = await axiosInstance.get("/session");
    const { sessions } = response.data;
    return sessions;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const loadMessages = async (id: any) => {
  try {
    if (!id) return [];
    const response = await axiosInstance.get(`/session/${id}`);
    const { messages } = response.data;
    return messages;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const sendMessage = async (
  sessionId: any,
  message: any,
  navigate: any
) => {
  try {
    let response;
    if (sessionId) {
      response = await axiosInstance.post("/session/message", {
        sessionId,
        message: message.message,
      });
    } else {
      response = await axiosInstance.post("/session/message", {
        message: message.message,
      });
    }
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
};
