import React, { useEffect } from "react";
import Router from "./layouts/routes.tsx";
import languageService from "./services/languageService.ts";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import i18n from "i18next";

const App: React.FC = () => {
  useEffect(() => {
    const changeLanguage = async () => {
      if (!languageService.hasLanguage) {
        languageService.saveLanguage("ar");
      }
      await i18n.changeLanguage(languageService.loadLanguage());
    };
    changeLanguage();
  }, []);

  return (
    <PrimeReactProvider>
      <Router />
    </PrimeReactProvider>
  );
};

export default App;
