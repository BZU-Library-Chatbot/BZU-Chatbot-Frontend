import { useState, useEffect } from "react";
import SidebarCss from "./Sidebar.module.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { IoChatbubbleSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const closeSidenav = () => {
    setCollapsed(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div
      className={`${SidebarCss.sidenav} ${
        collapsed ? SidebarCss["sidenav-collapsed"] : ""
      }`}
    >
      <div className={SidebarCss["logo-container"]}>
        <button className={SidebarCss.logo} onClick={toggleCollapse}>
          <AiOutlineMenu />
        </button>
        {collapsed && (
          <div className={SidebarCss["logo-text"]}>
            <FaPlus /> New chat
          </div>
        )}
        {collapsed && (
          <button className={SidebarCss["btn-close"]} onClick={closeSidenav}>
            <i
              className={`${SidebarCss["fal"]} ${SidebarCss["fa-times"]} ${SidebarCss["close-icon"]}`}
            ></i>
          </button>
        )}
      </div>
      <ul className={SidebarCss["sidenav-nav"]}>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session1"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session </span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session1"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session </span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session1"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session </span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session1"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session </span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
        <li className={SidebarCss["sidenav-nav-item"]}>
          <a
            className={SidebarCss["sidenav-nav-link"]}
            href="/session2"
            onClick={() => closeSidenav()}
          >
            <i className={`${SidebarCss["sidenav-link-icon"]}`}>
              <IoChatbubbleSharp />
            </i>
            {collapsed && (
              <span className={SidebarCss["sidenav-link-text"]}>Session</span>
            )}
          </a>
        </li>
      </ul>

      <div className={SidebarCss.logout}>
        <button className={SidebarCss["btn"]} onClick={handleLogout}>
          <FiLogOut />
          {collapsed && (
            <span className={SidebarCss["sidenav-link-text"]}>Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
