import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { forgetPasswordSchema } from "../validation/validate";
import styles from "./ForgetPassword.module.scss";
import { forgetPassword } from "./api";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
  code: string;
  password: string;
  cPassword: string;
}

const Register: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const initialValues: FormValues = {
    code: "",
    password: "",
    cPassword: "",
  };

  const onSubmit = async (values: FormValues) => {
    const payload = { ...values, email };
    const response = await forgetPassword(payload);
    if (response?.status < 300) {
      const { data } = response;
      formik.resetForm();
      navigate("/login");
      toast.success(`${t("forgetPassword.success")}`, {
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
      toast.error(`${t("forgetPassword.invalidData")}`, {
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
    validationSchema: forgetPasswordSchema,
  });

  const inputs = [
    {
      id: "code",
      type: "text",
      name: "code",
      placeholder: `${t("forgetPassword.code")}`,
      title: `${t("forgetPassword.code")}`,
      value: formik.values.code,
      onChange: formik.handleChange,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      placeholder: `${t("forgetPassword.password")}`,
      title: `${t("forgetPassword.password")}`,
      value: formik.values.password,
      onChange: formik.handleChange,
    },
    {
      id: "cPassword",
      type: "password",
      name: "cPassword",
      placeholder: `${t("forgetPassword.confirmPassword")}`,
      title: `${t("forgetPassword.confirmPassword")}`,
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
          <h1>{t("global.forgetPassword")}</h1>
          <div className={styles.inputBox}>{renderInputs[0]}</div>
          <div className={styles.inputBox}>{renderInputs[1]}</div>
          <div className={styles.inputBox}>{renderInputs[2]}</div>

          <button
            type="submit"
            className={styles.btn}
            disabled={!formik.isValid}
          >
            {t("forgetPassword.confirm")}
          </button>

          <div className={styles.loginLink}>
            <Link to="/login" className={`${styles.link}`}>
              {t("forgetPassword.login")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
