import React from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { registerSchema } from "../validation/validate";
import RegisterCss from "./Register.module.scss";
import { Link } from "react-router-dom";
import { register } from "./api";
import { useTranslation } from "react-i18next";

interface FormValues {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}

const Register: React.FC = () => {
  const { t } = useTranslation();
  const initialValues: FormValues = {
    userName: "",
    email: "",
    password: "",
    cPassword: "",
  };

  const onSubmit = async (user: FormValues) => {
    try {
      const data = await register(user);
      if (data.data.message == "success") {
        formik.resetForm();
        toast.success(`${t("register.registerSuccess")}`, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (e: any) {
      toast.error(e.response.data.error.split("\n")[0], {
        position: "top-center",
        autoClose: false,
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
    validationSchema: registerSchema,
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
    <div className={RegisterCss.body}>
      <div className={RegisterCss.wrapper}>
        <form onSubmit={formik.handleSubmit} action="">
          <h1>{t("global.register")}</h1>
          <div className={RegisterCss.inputBox}>{renderInputs[0]}</div>
          <div className={RegisterCss.inputBox}>{renderInputs[1]}</div>
          <div className={RegisterCss.inputBox}>{renderInputs[2]}</div>
          <div className={RegisterCss.inputBox}>{renderInputs[3]}</div>

          <button
            type="submit"
            className={RegisterCss.btn}
            disabled={!formik.isValid}
          >
            {t("global.register")}
          </button>

          <div className={RegisterCss.loginLink}>
            <p>
              {t("register.alreadyHaveAccount")}
              <Link to="/login">{t("global.login")}</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
