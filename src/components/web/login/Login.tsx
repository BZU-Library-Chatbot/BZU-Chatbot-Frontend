import React from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { loginSchema } from "../validation/validate";
import { Link, useNavigate } from "react-router-dom";
import LoginCss from "./Login.module.scss";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import authService from "../../../services/authService";
import { login } from "./api";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated()); 
  const navigate = useNavigate();

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
    try {
      const  data  = await login(user);

      if (data.message == "success") {
        authService.saveToken(data.token);
        authService.saveRefreshToken(data.refreshToken);
        toast.success("Login successfully!", {
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
        setIsAuth(true);
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
    validationSchema: loginSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "User Email",
      value: formik.values.email,
      placeholder: "Email",
      onChange: formik.handleChange,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "User Password",
      placeholder: "Password",
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
    <div className={LoginCss.body}>
      <div className={LoginCss.wrapper}>
        <form onSubmit={formik.handleSubmit} action="">
          <h1>Login</h1>
          <div className={LoginCss.inputBox}>{renderInputs[0]}</div>
          <div className={LoginCss.inputBox}>{renderInputs[1]}</div>

          <div className={LoginCss.rememberForgot}>
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className={LoginCss.btn}
            disabled={!formik.isValid}
          >
            Login
          </button>

          <div className={LoginCss.registerLink}>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
