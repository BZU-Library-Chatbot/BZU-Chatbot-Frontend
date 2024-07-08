import axiosInstance from "../../../../router/communicator";

export const fetchTableData = async (
  url: any,
  config: any,
  params: any = {}
): Promise<any> => {
  params = params || {};
  if (params.sort) {
    const sorting = [];
    for (let i = 0; i < params.sort.length; i++) {
      const sortItem = params.sort[i];
      if (sortItem.field.includes(",")) {
        const [field1, field2, field3] = sortItem.field.split(",");
        sorting.push(`${field1},${field2}`, `${field3},${sortItem.dir}`);
      } else {
        sorting.push(`${sortItem.field},${sortItem.dir}`);
      }
    }
    params.sort = sorting;
  }

  for (let i = 0; i < params.filter.length; i++) {
    params[params.filter[i]?.field] = params.filter[i]?.value;
  }
  params.filter = [];
  try {
    const response = await axiosInstance.get(url, {
      params: {
        ...params,
        page: params.page,
      },
      paramsSerializer: {
        indexes: null,
      },
    });
    const data = response.data.feedbacks;
    const lastPage = Math.ceil(response.data.totalFeedbacks / 10);
    return { data: data, last_page: lastPage };
  } catch (error) {
    return error;
  }
};

export const getFeedbackById = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/feedback/${id}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const deleteFeedback = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/feedback/${id}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};