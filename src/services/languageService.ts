const languageService = {
  loadLanguage(): any {
    return localStorage.getItem("language");
  },
  saveLanguage(language: any) {
    console.log("language", language);
    localStorage.setItem("language", language);
  },
  removeToken() {
    localStorage.removeItem("language");
  },
  hasLanguage() {
    return !!this.loadLanguage();
  },
};
export default languageService;
