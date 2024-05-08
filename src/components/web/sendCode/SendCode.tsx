import React from 'react'
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { sendCodeSchema } from "../validation/validate";
import { useNavigate } from "react-router-dom";
import styles from "./SendCode.module.scss";
import { sendCode } from "./api";
import { useTranslation } from "react-i18next";

interface FormValues {
    email: string;
}

const SendCode: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: "",
  };
  
  const onSubmit = async (value: FormValues) => {
    const response = await sendCode(value);

    if (response?.status < 300) {
      const { data } = response;
      navigate(`/reset-password/?email=${value.email}`);
      toast.success(`${t("sendCode.success")}`, {
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
    } else {
      toast.error(response.response.data.stack.split("\n")[0], {
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
    validationSchema: sendCodeSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: `${t("sendCode.email")}`,
      placeholder: `${t("sendCode.email")}`,
      value: formik.values.email,
      onChange: formik.handleChange,
    }
  ];

  const renderInputs = inputs.map((input, index) => (
    <Input
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
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <form onSubmit={formik.handleSubmit} action="">
          <h1> {t("global.sendCode")} </h1>
          <div className={styles.inputBox}>{renderInputs[0]}</div>
          <button
            type="submit"
            className={styles.btn}
            disabled={!formik.isValid}
          >
            {t("sendCode.send")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendCode;
