import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarCss from "./Navbar.module.scss";
import { SelectButton } from "primereact/selectbutton";
import languageService from "../../../services/languageService";
import authService from "../../../services/authService";

const Navbar: React.FC = () => {
  const options = [
    { label: "en", value: "en" },
    { label: "ar", value: "ar" },
  ];
  const [language, setLanguage] = React.useState(options[1].value);

  useEffect(() => {
    languageService.saveLanguage(language);
  }, [language]);

  const renderLoginLink = () => {
    if (authService.isAuthenticated()) {
      return null;
    }
    return (
      <>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="/login">
            Login
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${NavbarCss.bgGrey}`}>
        <div className={`container ${NavbarCss.container}`}>
          <a className={`navbar-brand`} href="#">
            BZU Library Chatbot
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
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>

                    {renderLoginLink()}
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
