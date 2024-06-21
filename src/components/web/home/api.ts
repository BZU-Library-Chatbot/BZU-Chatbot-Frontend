import axiosInstance from "../../../router/communicator";

export const fetchSessions = async (page = 1, size = 15) => {
  try {
    const response = await axiosInstance.get("/session", {
      params: { page, size },
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const loadMessages = async (id: any, page: any) => {
  try {
    if (!id) return [];
    const response = await axiosInstance.get(`/session/${id}`, {
      params: { page: page },
    });
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
