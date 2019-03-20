import axios from 'axios';

const ewApi = axios.create({
    baseURL: 'http://localhost:49763/'
})

export default ewApi;