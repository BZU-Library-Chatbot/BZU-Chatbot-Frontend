import React from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import authService from "../../../services/authService";
import { login } from "./api";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import * as yup from "yup";


interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = yup.object({
    email: yup
      .string()
      .required(t("validation.emailRequired"))
      .email(t("validation.validEmail")),
    password: yup
      .string()
      .min(8, t("validation.passwordLength"))
      .required(t("validation.PasswordRequired")),
  });

  useEffect(() => {
    if (isAuth) {
      const decoded: any = jwtDecode(authService.loadToken());
      if (decoded.role == "User") {
        navigate("/home");
      } else if (decoded.role == "Admin") {
        navigate("/admin");
      }
    }
  }, [isAuth]);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (user: FormValues) => {
    const response = await login(user);
    if (response?.status < 300) {
      const { data } = response;
      authService.saveToken(data.token);
      authService.saveRefreshToken(data.refreshToken);
      toast.success(`${t("login.success")}`, {
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
      dispatch(setUser(data.user));
      setIsAuth(true);
    } else if (response?.response?.status < 500) {
      toast.error(`${t("login.invalidCredentials")}`, {
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
    validationSchema: LoginSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: `${t("login.email")}`,
      placeholder: `${t("login.email")}`,
      value: formik.values.email,
      onChange: formik.handleChange,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: `${t("login.password")}`,
      placeholder: `${t("login.password")}`,
      value: formik.values.password,
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
          <h1> {t("global.login")} </h1>
          <div className={styles.inputBox}>{renderInputs[0]}</div>
          <div className={styles.inputBox}>{renderInputs[1]}</div>

          <div className={styles.rememberForgot}>
            <label>
              <input type="checkbox" />
              {t("login.rememberMe")}
            </label>
            <Link to="/send-code">{t("login.forgetPassword")}</Link>
          </div>
          <button
            type="submit"
            className={styles.btn}
            disabled={!formik.isValid}
          >
            {t("global.login")}
          </button>

          <div className={styles.registerLink}>
            <p>
              {t("login.noAccount")}{" "}
              <Link to="/register" className={`${styles.link}`}>
                {t("global.register")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
