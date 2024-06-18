import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import React, { useEffect } from "react";
import AdminRouter from "./layouts/AdminRouter.tsx";
import UserRoutes from "./layouts/UserRouter.tsx";
import languageService from "./services/languageService.ts";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import i18n from "./i18n/config.ts";
import { setUser } from "./redux/userSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import authService from "././services/authService.ts";
import { getProfile } from "./common/api.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { t }: any = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && authService.isAuthenticated()) {
        const response = await getProfile();
        if (response?.status < 300) {
          const userData = response.data.user;
          dispatch(setUser(userData));
        } else {
          toast.error(`${t("global.serverError")}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const changeLanguage = async () => {
      if (!languageService.hasLanguage()) {
        languageService.saveLanguage("ar");
      }
      await i18n.changeLanguage(languageService.loadLanguage());
    };
    changeLanguage();
    if (languageService.loadLanguage() === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const renderRoutes = () => {
    if (user?.role === "Admin") {
      return <AdminRouter />;
    } else {
      return <UserRoutes />;
    } 
  };

  return (
    <PrimeReactProvider>
      {renderRoutes()}
    </PrimeReactProvider>
  );
};

export default App;
