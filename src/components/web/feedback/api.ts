import axiosInstance from "../../../router/communicator";

export const sendFeedback = async (feedback: any, id: any) => {
  try {
    const response = await axiosInstance.post(`/feedback/${id}`, feedback);
    return response;
  } catch (error: any) {
    return error;
  }
};
