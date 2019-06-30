import axios from "axios";

const ax = axios.create({
    baseURL: "http://localhost:8180/pc/service/edge",
    responseType: "json",
    headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Basic c3U6Z3c=', 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods':  'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control'
},
    transformRequest: [
        (data, headers) => {
            const config = {"jsonrpc": "2.0",  "id": "1" };
            return JSON.stringify(Object.assign(data, config));
        },
    ],  
});

export default ax;