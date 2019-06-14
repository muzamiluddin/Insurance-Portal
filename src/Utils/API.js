import axios from "axious";

export default axios.create({
    baseURL: "http://localhost:8180/pc/service/edge/",
    responseType: "json"
});