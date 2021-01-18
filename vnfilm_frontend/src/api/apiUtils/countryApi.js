import axiosClient from '../axiosClient';

const countryApi = {
    getAll: (params) => {
        const url = 'country/'
        return axiosClient.get(url, params);
    }
}

export default countryApi;