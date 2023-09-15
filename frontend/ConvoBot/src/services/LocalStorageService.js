const USER_INFO = "userInfo";
const TOKEN = "token";
const localStorageService = {
    setToken(token) {
        localStorage.setItem(TOKEN, token);
    },
    getToken() {
        return localStorage.getItem(TOKEN);
    },
    setUserInfo(userInfo) {
        localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    },
    getUserInfo() {
        return JSON.parse(localStorage.getItem(USER_INFO));
    },
};

export default localStorageService;