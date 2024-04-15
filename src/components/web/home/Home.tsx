import React from "react";
import { useFormik } from "formik";
import InputHome from "../../pages/InputHome";
import Sidebar from "../sidebar/Sidebar";
import HomeCss from "./Home.module.scss";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSessions, loadMessages, sendMessage } from "./api";

interface FormValues {
  message: string;
}

interface ConversationItem {
  userMessage: string;
  botResponse: string | null;
}

const Home: React.FC = () => {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeSessionIndex = () => {
    const index = sessions.indexOf((session: any) => {
      session._id == id;
    });
    return index != -1 ? index : null;
  };

  useEffect(() => {
    setSessionId(id);
    const loader = async () => {
      const messages = await loadMessages(id);
      console.log(messages);

      setConversation(
        messages.map((message: any) => {
          return {
            userMessage: message.message,
            botResponse: message.response,
          };
        })
      );
      setSessions(await fetchSessions());
    };
    loader();
    setActiveIndex(activeSessionIndex());
  }, [id]);

  const initialValues: FormValues = {
    message: "",
  };

  const onSubmit = async (message: FormValues) => {
    try {
      const updatedConversation = [
        ...conversation,
        { userMessage: message.message, botResponse: null },
      ];
      setConversation(updatedConversation);

      formik.resetForm();
      const response: any = await sendMessage(sessionId, message, navigate);

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
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleSendMessage = () => {
    if (formik.values.message.trim() !== "") {
      onSubmit(formik.values);
    }
  };

  const inputs = [
    {
      id: "message",
      type: "text",
      name: "message",
      title: "message",
      value: formik.values.message,
      placeholder: "Enter your Message",
      onChange: formik.handleChange,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
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
    />
  ));

  const renderConversation = conversation.map((item, index) => (
    <div key={index} className={HomeCss.cont}>
      <div className={HomeCss.userMessageContainer}>
        <p className={HomeCss.userMessage}>{item.userMessage}</p>
      </div>
      <div className={HomeCss.botMessageContainer}>
        <p className={HomeCss.botMessage}>
          {item.botResponse ? item.botResponse : "Analyzing..."}
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
              <div
                className={HomeCss.submit}
                onClick={
                  formik.values.message.trim() !== ""
                    ? handleSendMessage
                    : undefined
                }
                style={{
                  cursor:
                    formik.values.message.trim() === ""
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                <MdOutlineFileUpload />
              </div>
            </div>
            <p className={HomeCss.info}>
              © 2023-2024 BZU-Library-Chatbot - All Right Reserved.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
