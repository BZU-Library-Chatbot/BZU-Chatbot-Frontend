import React from "react";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import styles from "./AdminRegister.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { adminRegister } from "./api";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

interface FormValues {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}

const AdminRegister: React.FC = () => {
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

  const onSubmit = async (admin: FormValues) => {
    const response = await adminRegister(admin);
    if (response?.status < 300) {
      formik.resetForm();
      toast.success(t("adminRegister.success"), {
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
      toast.error(t("adminRegister.duplicatedEmail"), {
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
      toast.error(t("global.serverError"), {
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

  const onclick = () => {
    navigate("/admin");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: RegisterSchema,
  });

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>{t("global.adminRegister")}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="userName">
                {t("adminRegister.username")}
              </label>
              <Field
                name="userName"
                type="text"
                className={
                  touched.userName && errors.userName ? styles.error : ""
                }
              />
              <ErrorMessage
                name="userName"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                {t("adminRegister.email")}
              </label>
              <Field
                name="email"
                type="email"
                className={touched.email && errors.email ? styles.error : ""}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                {t("adminRegister.password")}
              </label>
              <Field
                name="password"
                type="password"
                className={
                  touched.password && errors.password ? styles.error : ""
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="cPassword">
                {t("adminRegister.confirmPassword")}
              </label>
              <Field
                name="cPassword"
                type="password"
                className={
                  touched.cPassword && errors.cPassword ? styles.error : ""
                }
              />
              <ErrorMessage
                name="cPassword"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div
              style={{ display: "flex" }}
              className="justify-content-between w-full"
            >
              <button
                onClick={onclick}
                style={{ width: "20%" }}
                className="btn btn-danger"
              >
                {t("adminRegister.cancel")}
              </button>
              <button type="submit" className={styles.btn}>
                {t("adminRegister.save")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminRegister;
