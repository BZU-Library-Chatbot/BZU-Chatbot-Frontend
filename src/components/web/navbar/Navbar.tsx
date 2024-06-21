import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import authService from "../../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import userImageIcon from "../../../assets/Images/user-icon.svg";
import { clearUser } from "../../../redux/userSlice";
import { setUser } from "../../../redux/userSlice";
import { getProfile } from "../../../common/api";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState<string>("");

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
    setUserImage(user?.profilePic?.secure_url || "");
  }, [user, dispatch]);

  const handleLogout = () => {
    authService.removeToken();
    dispatch(clearUser());
    setUserImage("");
    navigate("/login");
  };

  return (
    <>
      <nav className={`navbar navbar-expand ${styles.navbarCustom}`}>
        <div
          className={`container ${styles.container} ${styles.navbarContainer}`}
        >
          <Link className={`${styles.logo}`} to="/">
            {t("global.title")}
          </Link>
          <div className={` ${styles.rightNavBar}`} id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={userImage ? userImage : userImageIcon}
                    alt="User Icon"
                    className={styles.userIcon}
                  />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/home">
                      {t("global.home")}
                    </Link>
                  </li>
                  {authService.isAdministrator() && (
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        {t("global.admins")}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/about">
                      {t("global.about")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      {t("global.settings")}
                    </Link>
                  </li>
                  {authService.isAuthenticated() ? (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          {t("global.logout")}
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          {t("global.login")}
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register">
                          {t("global.register")}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
