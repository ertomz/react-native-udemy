import axios from 'axios';
import { AsyncStorage } from 'react-native';


const instance = axios.create({
    baseURL: 'http://7d4212a4c92f.ngrok.io'
});

instance.interceptors.request.use(
    // Function 1: Called automatically when we make a request
    // Config object has info: URL, method, headers of the request
    // We want to modify config and tack on the token
    async (config) => {
        // Get token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        // If token, add to header
        if (token) {
            // Add Authorizaton header as Bearerk TOKEN (like we do in Postman!)
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Return modified config object
        return config;
    }, 
    // Function 2: Called automatically if error when making the request
    (err) => {
        return Promise.reject(err);
    } 
);

export default instance;