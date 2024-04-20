import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarCss from "./Navbar.module.scss";
import { SelectButton } from "primereact/selectbutton";
import languageService from "../../../services/languageService";
import authService from "../../../services/authService";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const options = ["en", "ar"];
  const [language, setLanguage] = React.useState(options[1]);

  useEffect(() => {
    const changeLanguage = async () => {
      languageService.saveLanguage(language);
      await i18n.changeLanguage(language);
    };
    changeLanguage();
    if (languageService.loadLanguage() === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [language]);

  const renderAuthLinks = () => {
    if (authService.isAuthenticated()) {
      return null;
    }
    return (
      <>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="/register">
            {t("global.register")}
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="/login">
            {t("global.login")}
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${NavbarCss.bgGrey}`}>
        <div
          className={`container ${NavbarCss.container} ${NavbarCss.navbarContainer}`}
        >
          <a className={`navbar-brand`} href="/">
            {t("global.title")}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`${NavbarCss.rightNavBar}`}>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("navbar.menu")}
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/home">
                        {t("global.home")}
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/about">
                        {t("global.about")}
                      </Link>
                    </li>

                    {renderAuthLinks()}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className={`${NavbarCss.selector}`}>
                      <SelectButton
                        value={language}
                        onChange={(e: any) => setLanguage(e.value)}
                        options={options}
                      />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
