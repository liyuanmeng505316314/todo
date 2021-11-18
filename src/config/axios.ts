
import axios from 'axios'

const appID='ajcC6CxT3E9pBaExVhbyqGCe';
const appSecret='52swBSJfBsFqDGQ33hLbcudP';

/* tslint:disable:no-string-literal*/

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

instance.interceptors.request.use(config => {
    const xToken = localStorage.getItem('x-token')
    if(xToken){

        if (!config?.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        // const config = {
        //     headers: { Authorization: `Bearer ${xToken}` }
        // };
        // return config;
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config;
}, (error) =>{
    return Promise.reject(error);
});

instance.interceptors.response.use( (response)=> {
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response;
},  (error)=>{
    return Promise.reject(error);
});

/* tslint:enable:no-string-literal*/

export default instance