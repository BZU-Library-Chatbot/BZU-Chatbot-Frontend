import React from "react";
import { useFormik } from "formik";
import api from "../../../services/Api";
import InputHome from "../../pages/InputHome";
import Sidebar from "../sidebar/Sidebar";
import HomeCss from "./Home.module.scss";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

interface FormValues {
  message: string;
}

interface ConversationItem {
  userMessage: string;
  botResponse: string | null;
}

const Home: React.FC = () => {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);

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

      const response = await api.post("/chatbot/sendMessage", message);
      const botResponse = response.data.message;
      console.log("Res: ", botResponse);

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
      console.log("Question", formik.values);
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

  return (
    <div className={HomeCss.wrapper}>
      <div className={HomeCss.container}>
        <Sidebar />
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
