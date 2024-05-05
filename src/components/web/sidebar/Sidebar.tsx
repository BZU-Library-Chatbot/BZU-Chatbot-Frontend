import { useState, useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { IoChatbubbleSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  onSessionClick: (sessionId: string) => void;
  setConversation: any;
  sessions: any[];
  activeIndex: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSessionClick,
  setConversation,
  sessions,
  activeIndex,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const createNewChat = async () => {
    setConversation([]);
    navigate("/home");
  };

  const handleLogout = () => {
    authService.removeToken();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleSessionClick = (index: number) => {
    onSessionClick(sessions[index]._id);
  };

  return (
    <div
      className={`${styles.sidenav} ${
        collapsed ? styles["sidenav-collapsed"] : ""
      }`}
    >
      <div className={styles["logo-container"]}>
        <button className={styles.logo} onClick={toggleCollapse}>
          <AiOutlineMenu />
        </button>
        {collapsed && (
          <div className={styles["logo-text"]} onClick={createNewChat}>
            <FaPlus /> {t("sidebar.newChat")}
          </div>
        )}
        {collapsed && null}
      </div>
      <ul className={styles["sidenav-nav"]}>
        {sessions?.map((session: any, index) => (
          <li
            key={index}
            className={`${styles["sidenav-nav-item"]} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <button
              className={styles["sidenav-nav-link"]}
              onClick={() => handleSessionClick(index)}
            >
              <i className={`${styles["sidenav-link-icon"]}`}>
                <IoChatbubbleSharp />
              </i>
              {collapsed && (
                <span className={styles["sidenav-link-text"]}>
                  {session.title}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.buttons}>
        <button className={styles["btn"]} onClick={handleLogout}>
          <FiLogOut />
          {collapsed && (
            <span className={styles["sidenav-link-text"]}>
              {t("sidebar.logout")}
            </span>
          )}
        </button>
        <button
          className={`${styles["btn"]} ${!collapsed && styles.settings}`}
          onClick={handleSettings}
        >
          <i className="fa-solid fa-gear"></i>
          {collapsed && (
            <span className={`${styles["sidenav-link-text"]}`}>
              {t("global.settings")}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
