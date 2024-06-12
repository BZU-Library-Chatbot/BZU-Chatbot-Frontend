import { useState, useEffect, useRef } from "react";
import styles from "./Sidebar.module.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { IoChatbubbleSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { useTranslation } from "react-i18next";
import { toast, Bounce } from "react-toastify";
import { changeSessionTitle } from "./api";
import { fetchSessions } from "../home/api";

interface SidebarProps {
  onSessionClick: (sessionId: string) => void;
  setConversation: any;
  sessions: any[];
  activeIndex: any;
  setSessions: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSessionClick,
  setConversation,
  sessions,
  activeIndex,
  setSessions,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [, setScreenWidth] = useState(window.innerWidth);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const sidebarRef: any = useRef(null);
  const [allSessionsLoaded, setAllSessionsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);

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

  const handleSessionClick = (index: number) => {
    onSessionClick(sessions[index]._id);
  };

  const handleDoubleClick = (index: number) => {
    if (authService.isAuthenticated()) {
      setEditingIndex(index);
      setNewTitle(sessions[index].title);
    } else {
      toast.error(t("sidebar.updateForNonReisterd"), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleSubmit = async (index: number) => {
    const sessionId = sessions[index]._id;
    const response = await changeSessionTitle({ title: newTitle }, sessionId);
    if (response?.status < 300) {
      const updatedSessions = [...sessions];
      updatedSessions[index].title = newTitle;
      setSessions(updatedSessions);
      setEditingIndex(null);
    } else if (response?.response?.status < 500) {
      toast.error(`sidebar.faildUpadateTitle`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } else {
      toast.error(t(`global.serverError`), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
  };

  const handleEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      handleTitleSubmit(index);
    }
  };

  const fetchMoreSessions = async () => {
    if (isFetching || allSessionsLoaded) return;
    setIsFetching(true);
    const page = Math.ceil(sessions.length / 15 + 1);
    const response = await fetchSessions(page);
    if (response?.status < 300) {
      if (sessions.length === response.data.totalSessions) {
        setAllSessionsLoaded(true);
      }
      setSessions((prevSessions: any) => [
        ...prevSessions,
        ...response.data.sessions,
      ]);
    } else {
      toast.error(t(`global.serverError`), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
    setIsFetching(false);
  };

  const handleScroll = () => {
    if (sidebarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchMoreSessions();
      }
    }
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
      <ul
        className={styles["sidenav-nav"]}
        ref={sidebarRef}
        onScroll={handleScroll}
      >
        {sessions?.map((session: any, index) => (
          <li
            key={index}
            className={`${styles["sidenav-nav-item"]} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={newTitle}
                onChange={handleTitleChange}
                onBlur={() => handleTitleSubmit(index)}
                autoFocus
                onKeyDown={(event) => handleEnterKey(event, index)}
              />
            ) : (
              <button
                className={styles["sidenav-nav-link"]}
                onClick={() => handleSessionClick(index)}
                onDoubleClick={() => handleDoubleClick(index)}
              >
                <i
                  className={`${styles["sidenav-link-icon"]} ${
                    !collapsed && "w-100"
                  } ${collapsed && styles.me16px}`}
                >
                  <IoChatbubbleSharp />
                </i>
                {collapsed && (
                  <span className={styles["sidenav-link-text"]}>
                    {session.title}
                  </span>
                )}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
