import React from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { loginSchema } from "../validation/validate";
import api from "../../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import LoginCss from "./Login.module.scss";
import { jwtDecode } from "jwt-decode";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (users: FormValues) => {
    console.log("users=", users);

    try {
      const { data } = await api.post("/auth/login", users);

      if (data.message == "success") {
        localStorage.setItem("userToken", data.token);
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

        const decoded: any = jwtDecode(data.token);
        console.log(decoded);
        console.log(decoded.role);
        if (decoded.role == "User") {
          navigate("/home");
        } else if (decoded.role == "Admin") {
          navigate("/admin");
        }
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
