import axiosInstance from "../../../router/communicator";

export const activateUser = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/auth/activate/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const deactivateUser = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/auth/deactivate/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

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
  params.limit = params.size;
  delete params.size;
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
    const data = response.data.admins;
    const lastPage = Math.ceil(response.data.totalAdmins / 10);
    return { data: data, last_page: lastPage };
  } catch (error) {
    return error;
  }
};
