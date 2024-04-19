const languageService = {
  loadLanguage(): any {
    return localStorage.getItem("language");
  },
  saveLanguage(language: any) {
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
