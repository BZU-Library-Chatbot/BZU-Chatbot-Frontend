import axiosInstance from "../../../router/communicator";

export const fetchSessions = async () => {
  try {
    const response = await axiosInstance.get("/session", {params: {size:15}});
    return response;
  } catch (error: any) {
    return error;
  }
};

export const loadMessages = async (id: any) => {
  try {
    if (!id) return [];
    const response = await axiosInstance.get(`/session/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const sendMessage = async (sessionId: any, message: any) => {
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
    return error;
  }
};
