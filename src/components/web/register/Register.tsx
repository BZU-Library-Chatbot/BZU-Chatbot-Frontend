import React from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { registerSchema } from "../validation/validate";
import RegisterCss from   "./Register.module.scss";
import api from "../../../services/Api";
import { Link } from "react-router-dom";


interface FormValues {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}

const Register: React.FC = () => {
  const initialValues: FormValues = {
    userName: "",
    email: "",
    password: "",
    cPassword: "",
  };


  const onSubmit = async (users: FormValues) => {
    console.log(users);
    try {
      const data = await api.post("/auth/signup", users);
      console.log(data);
      console.log(data.data.message);
      
      if (data.data.message == "success") {
        formik.resetForm();
        toast.success('Account created successfully! Please verify your email to login!', {
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
    }catch(e : any){
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
      title: "User Name",
      placeholder: "Username",
      value: formik.values.userName,
      onChange: formik.handleChange,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      placeholder: "Email",
      title: "User Email",
      value: formik.values.email,
      onChange: formik.handleChange,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      placeholder: "Password",
      title: "User Password",
      value: formik.values.password,
      onChange: formik.handleChange,
    },
    {
      id: "cPassword",
      type: "password",
      name: "cPassword",
      placeholder: "Confirm password",
      title: "Confirm Password",
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
        <form onSubmit={formik.handleChange} action="">
          <h1>Register</h1>
          <div className={RegisterCss.inputBox}>
            {renderInputs[0]}
          </div>
          <div className={RegisterCss.inputBox}>
            {renderInputs[1]}
          </div>
          <div className={RegisterCss.inputBox}>
            {renderInputs[2]}
          </div>
          <div className={RegisterCss.inputBox}>
            {renderInputs[3]}
          </div>

          <button type="submit" className={RegisterCss.btn} disabled={!formik.isValid}>
          Register
          </button>

          <div className={RegisterCss.loginLink}>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>

        </form>
      </div>
    </div>
    // <div className="register-container">
    //   <div className="container">
    //     <h2>Register</h2>
    //     <form onSubmit={formik.handleSubmit} className="register-form">
    //       {renderInputs}
    //       <button type="submit" disabled={!formik.isValid}>
    //         Register
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Register;
