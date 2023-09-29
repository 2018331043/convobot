import axios from "axios";
import localStorageService from "../services/LocalStorageService";

const apiService = {
    init() {
        //this localhost url redirecting to https://test.clients.inovacetech.com by using vue.config devServer proxy
        //axios.defaults.baseURL = "http://localhost:8080/inovace-client/api/v1";
        //this url for local api server
        axios.defaults.baseURL= "http://localhost:8080/convobot/api/v1";
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.headers.common["Authorization"] = 'Bearer' + (localStorageService.getToken() === null ? '':(' '+localStorageService.getToken()));
    },
    setToken: function (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
};

export default apiService;
