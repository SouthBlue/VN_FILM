import axiosClient, { axiosClient1 } from "../axiosClient";

const filmApi = {
  upload: (data) => {
    const url = "film/upload";
    return axiosClient1.post(url, data);
  },

  filmHome: (params) => {
    const url = "film/filmhome";
    return axiosClient.get(url, params);
  },
  getone: (params) => {
    const url = `film/getone/${params}`;
    return axiosClient.get(url);
  },
  getEpisode: (params) => {
    const url = `film/all-episode/${params}`;
    return axiosClient.get(url);
  },
  getTopView: (params) => {
    const url = "film/topview";
    return axiosClient.get(url, params);
  },
  getByCategory: (id, params) => {
    const url = `film/bycategory/${id}`;
    return axiosClient.get(url, { params });
  },
  getByCountry: (id, params) => {
    const url = `film/bycountry/${id}`;
    return axiosClient.get(url, { params });
  },
  getByType: (handle, params) => {
    const url = `film/bytype/${handle}`;
    return axiosClient.get(url, { params });
  },
  search: (params) => {
    const url = "film/search";
    return axiosClient.get(url, { params})
  },
};

export default filmApi;
