const authService = {
  loadToken(): any {
    return localStorage.getItem("userToken");
  },
  saveToken(token: any) {
    localStorage.setItem("userToken", token);
  },
  saveRefreshToken(token: any) {
    localStorage.setItem("refreshToken", token);
  },
  removeToken() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
  },
  isAuthenticated() {
    return !!this.loadToken();
  },
  isAdministrator() {
    const token = this.loadToken();
    if (token) {
      const payload = token.split(".")[1];
      const data = JSON.parse(atob(payload));
      console.log(data);
      return data.role === "Admin";
    }
    return false;
  },
};
export default authService;
