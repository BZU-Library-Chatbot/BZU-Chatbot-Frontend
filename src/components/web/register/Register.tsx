import React from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { register } from "./api";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface FormValues {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const RegisterSchema = yup.object({
    userName: yup
      .string()
      .required(t("validation.usernameRequired"))
      .min(3, t("validation.userNameMinLength"))
      .max(30, t("validation.userNameMaxLength")),
    email: yup
      .string()
      .required(t("validation.emailRequired"))
      .email(t("validation.validEmail")),
    password: yup
      .string()
      .min(8, t("validation.passwordLength"))
      .matches(/[0-9]/, t("validation.containsNumber"))
      .matches(/[a-z]/, t("validation.containsLowercase"))
      .matches(/[A-Z]/, t("validation.containsUppercase"))
      .required(t("validation.PasswordRequired")),
    cPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], t("validation.passwordMatch"))
      .required(t("validation.cPasswordRequired")),
  });

  const initialValues: FormValues = {
    userName: "",
    email: "",
    password: "",
    cPassword: "",
  };

  const onSubmit = async (user: FormValues) => {
    const response = await register(user);
    if (response?.status < 300) {
      const { data } = response;
      formik.resetForm();
      navigate("/login");
      toast.success(`${t("register.success")}`, {
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
    } else if (response?.response?.status < 500) {
      toast.error(`${t("register.duplicatedEmail")}`, {
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
    validationSchema: RegisterSchema,
  });

  const inputs = [
    {
      id: "username",
      type: "text",
      name: "userName",
      title: `${t("register.username")}`,
      placeholder: `${t("register.username")}`,
      value: formik.values.userName,
      onChange: formik.handleChange,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      placeholder: `${t("register.email")}`,
      title: `${t("register.email")}`,
      value: formik.values.email,
      onChange: formik.handleChange,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      placeholder: `${t("register.password")}`,
      title: `${t("register.password")}`,
      value: formik.values.password,
      onChange: formik.handleChange,
    },
    {
      id: "cPassword",
      type: "password",
      name: "cPassword",
      placeholder: `${t("register.confirmPassword")}`,
      title: `${t("register.confirmPassword")}`,
      value: formik.values.cPassword,
      onChange: formik.handleChange,
    },
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
          <h1>{t("global.register")}</h1>
          <div className={styles.inputBox}>{renderInputs[0]}</div>
          <div className={styles.inputBox}>{renderInputs[1]}</div>
          <div className={styles.inputBox}>{renderInputs[2]}</div>
          <div className={styles.inputBox}>{renderInputs[3]}</div>

          <button
            type="submit"
            className={styles.btn}
            disabled={!formik.isValid}
          >
            {t("global.register")}
          </button>

          <div className={styles.loginLink}>
            <p className={`${styles.haveAnAccount}`}>
              {t("register.alreadyHaveAccount")}
              <Link to="/login" className={`${styles.link}`}>
                {t("global.login")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
