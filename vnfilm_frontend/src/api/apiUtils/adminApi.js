import axiosClient from '../axiosClient';

const adminApi = {
    getTotal: (params) => {
        const url = 'admin/total'
        return axiosClient.get(url, params);
    }
}

export default adminApi;