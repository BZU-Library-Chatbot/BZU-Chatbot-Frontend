import axiosInstance from "../../../router/communicator";

export const sidebar = async (value: any, id: any ) => {
  try {
    const response = await axiosInstance.patch(`/session/title/${id}`, value);
    return response;
  } catch (error: any) {
    return error;
  }
};
