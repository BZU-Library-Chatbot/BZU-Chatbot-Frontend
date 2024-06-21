import axiosInstance from "../../../router/communicator";

export const changeProfilePicture = async (image: any) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    const response = await axiosInstance.patch("/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    return error;
  }
};
