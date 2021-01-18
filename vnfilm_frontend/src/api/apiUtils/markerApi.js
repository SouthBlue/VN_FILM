import axiosClient from "../axiosClient";

const markerApi = {
  getCheck: (params) => {
    const url = "marker/check";
    return axiosClient.get(url, { params });
  },
  addMarker: (data) => {
    const url = "marker/add";
    return axiosClient.post(url, data);
  },
  unMarked: (params) => {
    const url = "marker/unmarked";
    return axiosClient.delete(url, {params});
  },
  getAllByUser: (use_id, params) => {
    const url = `marker/listmarked/${use_id}`;
    return axiosClient.get(url, {params});
  },
};

export default markerApi;
