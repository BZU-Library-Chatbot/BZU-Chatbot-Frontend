import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import languageService from "../../../services/languageService";
import authService from "../../../services/authService";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const options = ["en", "ar"];
  const [language, setLanguage] = React.useState(
    languageService.loadLanguage()
  );
  const [isActive, setIsActive] = useState(false);
  const mainLinks = [
    { title: "home", path: "/home" },
    { title: "about", path: "/about" },
    { title: "settings", path: "/settings" },
  ];

  const toggleMenu = () => {
    setIsActive(!isActive);
    console.log("Clicked menu");
  };

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

  const removeLastActive = () => {
    const active = document.querySelector(`.${styles.active}`);
    if (active) {
      active.classList.remove(styles.active);
    }
  };

  const linkClick = (e: any) => {
    removeLastActive();
    const element = e.target as HTMLElement;
    element.classList.add(`${styles.active}`);
  };

  const renderNavLinks = () => {
    return (
      <ul className={`navbar-nav ${styles.navList} h-100`}>
        {mainLinks.map((link, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li>
                <hr className="dropdown-divider" />
              </li>
            )}
            <li
              className={`nav-item ${styles.navListItem}`}
              onClick={linkClick}
            >
              <Link
                className={`text-capitalize ${styles.navLink}`}
                to={`${link.path}`}
              >
                <span> {t(`global.${link.title}`)} </span>
              </Link>
            </li>
          </React.Fragment>
        ))}
        {renderAuthLinks()}
      </ul>
    );
  };

  const renderAuthLinks = () => {
    if (authService.isAuthenticated()) {
      return null;
    }
    return (
      <React.Fragment>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className={`nav-item ${styles.navListItem}`} onClick={linkClick}>
          <Link className={`text-capitalize ${styles.navLink}`} to={`/login`}>
            <span> {t(`global.login`)} </span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className={`nav-item ${styles.navListItem}`} onClick={linkClick}>
          <Link
            className={`text-capitalize ${styles.navLink}`}
            to={`/register`}
          >
            <span> {t(`global.register`)} </span>
          </Link>
        </li>
      </React.Fragment>
    );
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.navbarCustom}`}>
        <div
          className={`container ${styles.container} ${styles.navbarContainer}`}
        >
          <a className={`navbar-brand ${styles.logo}`} href="/">
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
          <div
            className={`collapse navbar-collapse ${styles.rightNavBar}`}
            id="navbarSupportedContent"
          >
            {renderNavLinks()}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
