import React, { useRef } from "react";
import { useFormik } from "formik";
import InputHome from "../../pages/InputHome";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Home.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSessions, loadMessages, sendMessage } from "./api";
import authService from "../../../services/authService";
import { useTranslation } from "react-i18next";
import chatbotImage from "../../../assets/Images/chatbot-icon.svg";
import userImageIcon from "../../../assets/Images/user-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../common/api";
import { setUser } from "../../../redux/userSlice";
import { toast, Bounce } from "react-toastify";
import RatingStar from "../ratingStar/RatingStar";
import Feedback from "../feedback/Feedback";

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
  const chatContainerRef: any = useRef(null);
  const { user } = useSelector((state: any) => state.user);
  const [userImage, setUserImage] = useState<string>("");
  const dispatch = useDispatch();
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (rating: number) => {
    setRating(rating);
    setShowFeedback(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

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
      if (authService.isAuthenticated() && sessions.length == 0) {
        const response = await fetchSessions();
        if (response?.status < 300) {
          setSessions(response.data.sessions);
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
            transition: Bounce,
          });
        }
      }
    };
    loader();
    setUserImage(user?.profilePic?.secure_url);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && authService.isAuthenticated()) {
        const response = await getProfile();
        if (response?.response?.status < 300) {
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
            transition: Bounce,
          });
        }
      }
    };
    fetchUser();
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
                _id: message._id,
              };
            })
          );
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
            transition: Bounce,
          });
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

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

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
        sessions.unshift(response.data.session);
        setActiveIndex(sessions.length - 1);
        navigate(`/home/${response.data.sessionId}`);
      }

      const botResponse = response.data.response;
      const {_id} = response.data;
      const lastIdx = updatedConversation.length - 1;
      const updatedConversationWithResponse = [
        ...updatedConversation.slice(0, lastIdx),
        { ...updatedConversation[lastIdx], botResponse, _id},
      ];
      setConversation(updatedConversationWithResponse);
      stopUpdatingDots(intervalId);
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
        transition: Bounce,
      });
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
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        message={formik.values.message}
        handleSendMessage={handleSendMessage}
      />
    </>
  ));

  const renderConversation = conversation?.map((item: any, index) => (
    <div key={index} className={styles.cont}>
      <div className={styles.userMessageContainer}>
        <div className={styles.msgContainer}>
          <img src={userImage || userImageIcon} alt="userImageIcon" />
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

        <div className={styles.ratingStar}></div>
      </div>
      {item.botResponse ? (
        <>
          <RatingStar onStarClick={handleStarClick} />
          <Feedback
            show={showFeedback}
            handleClose={handleCloseFeedback}
            rating={rating}
            interactionId={item._id}
          />
        </>
      ) : null}
    </div>
  ));

  const handleSessionClick = (sessionId: string) => {
    if (id != sessionId) {
      navigate(`/home/${sessionId}`);
      setConversation([]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Sidebar
          onSessionClick={handleSessionClick}
          setConversation={setConversation}
          sessions={sessions}
          activeIndex={activeIndex}
          setSessions={setSessions}
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
