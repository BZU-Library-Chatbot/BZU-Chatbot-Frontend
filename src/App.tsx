import React, { useEffect } from "react";
import Router from "./layouts/routes.tsx";
import languageService from "./services/languageService.ts";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

const App: React.FC = () => {
  useEffect(() => {
    if (!languageService.hasLanguage) {
      languageService.saveLanguage("ar");
    }
  }, []);

  return (
    <PrimeReactProvider>
      <Router />
    </PrimeReactProvider>
  );
};

export default App;
