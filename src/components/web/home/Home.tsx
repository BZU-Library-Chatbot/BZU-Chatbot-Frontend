import React from 'react';
// import {useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import api from "../../../services/Api";
import InputHome from "../../pages/InputHome";
import Sidebar from '../sidebar/Sidebar';
import HomeCss from "./Home.module.scss";

interface FormValues {
  message: string;
}

const Home: React.FC = () => {

  // const navigate = useNavigate();
  const initialValues: FormValues = {
    message: "",
  };

  const onSubmit = async (message: FormValues) => {
    try{
      const  response  = await api.post("/chatbot/sendMessage", message);
      console.log(response.data.message);
    }catch(err){
      console.error(err);
    } 
    
  } 

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleSendMessage = () => {
    onSubmit(formik.values);
    console.log(formik.values);
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
    }
  ]

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

  return (

    <div className={HomeCss.wrapper}>
      <Sidebar />
      <section className={HomeCss.main}>
        <h1>BZU Library Chatbot</h1>
        <ul className={HomeCss.feed}>


        </ul>
        <div className={HomeCss.bottomSection}>
          <form action="" onSubmit={formik.handleSubmit}></form>
          <div className={HomeCss.inputContainer}>
            {renderInputs}
            <div className={HomeCss.submit} onClick={handleSendMessage} >➢</div>
          </div>
          <p className={HomeCss.info}>
          © 2023-2024 BZU-Library-Chatbot - All Right Reserved.</p>
        </div>
      </section>
    </div>
    // <div className={HomeCss.container}>
    //   <form className={HomeCss.messageBox} action="">
    //     {renderInputs}
    //     <button className={HomeCss.sendButton} type="submit">Send</button>
    //   </form>
      
    // </div>
  );
};

export default Home;
