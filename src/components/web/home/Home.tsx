import React from "react";
import { useFormik } from "formik";
import InputHome from "../../pages/InputHome";
import Sidebar from "../sidebar/Sidebar";
import HomeCss from "./Home.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSessions, loadMessages, sendMessage } from "./api";
import authService from "../../../services/authService";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

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

  const activeSessionIndex = () => {
    const index = sessions.findIndex((session: any) => session._id == id);
    return index != -1 ? index : null;
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
  }, [sessions]);

  useEffect(() => {
    setSessionId(id);
    if (id) {
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

  const renderConversation = conversation?.map((item, index) => (//here
    <div key={index} className={HomeCss.cont}>
      <div className={HomeCss.userMessageContainer}>
        <p className={HomeCss.userMessage}>{item.userMessage}</p>
      </div>
      <div className={HomeCss.botMessageContainer}>
        <p
          className={`${HomeCss.botMessage} ${
            !item.botResponse ? HomeCss.dots : ""
          }`}
        >
          {item.botResponse ? item.botResponse : dots}
        </p>
      </div>
    </div>
  ));

  const handleSessionClick = (sessionId: string) => {
    navigate(`/home/${sessionId}`);
  };

  return (
    <div className={HomeCss.wrapper}>
      <div className={HomeCss.container}>
        <Sidebar
          onSessionClick={handleSessionClick}
          setConversation={setConversation}
          sessions={sessions}
          activeIndex={activeIndex}
        />
        <section className={HomeCss.main}>
          <div className={HomeCss.feed}>{renderConversation}</div>
          <div className={HomeCss.bottomSection}>
            <form action="" onSubmit={formik.handleSubmit}></form>
            <div className={HomeCss.inputContainer}>
              <div>{renderInputs}</div>
            </div>
            <p className={HomeCss.info}>{t("global.copyRights")}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
