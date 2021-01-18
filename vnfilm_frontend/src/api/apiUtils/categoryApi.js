import axiosClient from '../axiosClient';

const categoryApi = {
    getAll: (params) => {
        const url = 'category/'
        return axiosClient.get(url, params);
    }
}

export default categoryApi;