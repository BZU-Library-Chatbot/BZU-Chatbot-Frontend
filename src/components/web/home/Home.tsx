import React from "react";
import { useFormik } from "formik";
import InputHome from "../../pages/InputHome";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Home.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSessions, loadMessages, sendMessage } from "./api";
import authService from "../../../services/authService";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import chatbotImage from "../../../assets/Images/chatbot-icon.svg";
import userImageIcon from "../../../assets/Images/user-icon.svg";
import tariqImage from "../../../assets/Images/tariq.jpg";

interface FormValues {
  message: string;
}

interface ConversationItem {
  userMessage: string;
  botResponse: string | null;
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dots, setDots] = useState("");
  const [intervalId, setIntervalId] = useState<any>(null);
  const chatContainerRef: any = React.createRef<HTMLDivElement>();

  const activeSessionIndex = () => {
    const index = sessions.findIndex((session: any) => session._id == id);
    return index != -1 ? index : null;
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const loadMoreMessages = async () => {
    console.log("====================================");
    console.log("load more messages");
    console.log("====================================");
  };

  const handleScroll = () => {
    if (chatContainerRef.current.scrollTop === 0) {
      loadMoreMessages();
    }
  };

  useEffect(() => {
    const loader = async () => {
      if (authService.isAuthenticated()) {
        const response = await fetchSessions();
        if (response?.status < 300) {
          setSessions(response.data.sessions);
        } else {
          toast.error(t("global.serverError"));
        }
      }
    };
    loader();
  }, []);

  useEffect(() => {
    setSessionId(id);
    if (id && conversation.length === 0) {
      const loader = async () => {
        const response = await loadMessages(id);
        if (response?.status < 300) {
          setConversation(
            response?.data?.messages?.map((message: any) => {
              return {
                userMessage: message.message,
                botResponse: message.response,
              };
            })
          );
        } else {
          toast.error(t("global.serverError"));
        }
      };
      loader();
    }
  }, [id]);

  useEffect(() => {
    if (sessions) {
      setActiveIndex(activeSessionIndex());
    }
  }, [sessions, id]);

  const initialValues: FormValues = {
    message: "",
  };

  const onSubmit = async (message: FormValues) => {
    const updatedConversation = [
      ...conversation,
      { userMessage: message.message, botResponse: null },
    ];
    setConversation(updatedConversation);

    formik.resetForm();
    const response: any = await sendMessage(sessionId, message);
    if (response?.status < 300) {
      if (!sessionId) {
        sessions.push(response.data.session);
        setActiveIndex(0);
        navigate(`/home/${response.data.sessionId}`);
      }

      const botResponse = response.data.response;
      const lastIdx = updatedConversation.length - 1;
      const updatedConversationWithResponse = [
        ...updatedConversation.slice(0, lastIdx),
        { ...updatedConversation[lastIdx], botResponse },
      ];
      setConversation(updatedConversationWithResponse);
      stopUpdatingDots(intervalId);
    } else {
      toast.error(t("global.serverError"));
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleSendMessage = () => {
    if (formik.values.message.trim() !== "") {
      setIntervalId(startUpdatingDots());
      onSubmit(formik.values);
    }
  };

  const startUpdatingDots = () => {
    setDots("");
    setIntervalId(
      setInterval(() => {
        setDots((prevDots) => (prevDots == "..." ? "" : "." + prevDots));
      }, 750)
    );

    return intervalId;
  };

  const stopUpdatingDots = (intervalId: any) => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const inputs = [
    {
      id: "message",
      type: "text",
      name: "message",
      title: `${t("home.enterMessage")}`,
      value: formik.values.message,
      placeholder: `${t("home.enterMessage")}`,
      onChange: formik.handleChange,
    },
  ];

  const renderInputs = inputs?.map((input, index) => (
    <>
      <InputHome
        type={input.type}
        id={input.id}
        name={input.name}
        title={input.title}
        value={input.value}
        key={index}
        placeholder={input.placeholder}
        errors={formik.errors}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        message={formik.values.message}
        handleSendMessage={handleSendMessage}
      />
    </>
  ));

  const renderConversation = conversation?.map((item, index) => (
    <div key={index} className={styles.cont}>
      <div className={styles.userMessageContainer}>
        <div className={styles.msgContainer}>
          <img src={userImageIcon} alt="userImageIcon" />
          <p className={styles.userMessage}>{item.userMessage}</p>
        </div>
      </div>
      <div className={styles.botMessageContainer}>
        <div className={styles.msgContainer}>
          <p
            className={`${styles.botMessage} ${
              !item.botResponse ? styles.dots : ""
            }`}
          >
            {item.botResponse ? item.botResponse : dots}
          </p>

          <img src={chatbotImage} alt="chatbotImage" />
        </div>
      </div>
    </div>
  ));

  const handleSessionClick = (sessionId: string) => {
    navigate(`/home/${sessionId}`);
    setConversation([]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Sidebar
          onSessionClick={handleSessionClick}
          setConversation={setConversation}
          sessions={sessions}
          activeIndex={activeIndex}
        />
        <section className={styles.main}>
          <div
            className={styles.feed}
            ref={chatContainerRef}
            onScroll={handleScroll}
          >
            {renderConversation}
          </div>
          <div className={styles.bottomSection}>
            <form action="" onSubmit={formik.handleSubmit}></form>
            <div className={styles.inputContainer}>
              <div>{renderInputs}</div>
            </div>
            <p className={styles.info}>{t("global.copyRights")}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
