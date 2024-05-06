import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const mainLinks = [
    { title: "home", path: "/home" },
    { title: "about", path: "/about" },
  ];

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
            <li className={`nav-item ${styles.navListItem}`}>
              <Link
                className={`text-capitalize ${styles.navLink}`}
                to={`${link.path}`}
              >
                <span> {t(`global.${link.title}`)} </span>
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    );
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.navbarCustom}`}>
        <div
          className={`container ${styles.container} ${styles.navbarContainer}`}
        >
          <Link className={`navbar-brand ${styles.logo}`} to="/">
            {t("global.title")}
          </Link>

          <button
            className={`navbar-toggler ${styles.toggleBtn}`}
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
