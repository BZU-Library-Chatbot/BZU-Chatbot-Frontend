const authService = {
    loadToken(): any {
        return localStorage.getItem("userToken");
    },
    saveToken(token: any){
        localStorage.setItem("userToken", token);
    },
    saveRefreshToken(token: any){
        localStorage.setItem("refreshToken", token);
    },
    removeToken(){
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
    },
    isAuthenticated(){
        return !!this.loadToken();
    }
};
export default authService;
