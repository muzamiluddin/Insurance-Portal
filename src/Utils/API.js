import axios from "axios";

const ax = axios.create({
    baseURL: "http://localhost:8180/pc/service/edge",
    responseType: "json",
    headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Basic c3U6Z3c=', 
        'Access-Control-Allow-Origin': '*'
},
    transformRequest: [
        (data, headers) => {
            const config = {"jsonrpc": "2.0",  "id": "1" };
            return JSON.stringify(Object.assign(data, config));
        },
    ],  
});

export default ax;