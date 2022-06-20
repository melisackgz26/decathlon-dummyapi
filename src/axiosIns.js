import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dummyapi.io/data/v1',
    headers: {
        'app-id': '62acc6fddf59ccf9ed0cdd71',
    },
});

export default instance;