import axiosClient from '../axiosClient';

const typeApi = {
    getAll: (params) => {
        const url = 'type/'
        return axiosClient.get(url, params);
    }
}

export default typeApi;