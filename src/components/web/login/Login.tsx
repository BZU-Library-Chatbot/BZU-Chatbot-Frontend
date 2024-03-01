import React from 'react';
import Input from '../../pages/Input'; 
import { useFormik } from 'formik';
// import { toast, Bounce  } from 'react-toastify';
import { loginSchema } from '../validation/validate';
// import './Register.css'; 
import api from "../../../services/Api"


interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (users: FormValues) => {

    console.log("users=",users);

    const {data} = await api.post('/auth/login',users)
//     if (data.message=='success'){
//       formik.resetForm();
//           toast.warn('Account created successfully! Please verify your email to login!', {
//               position: "top-right",
//               autoClose: false,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//               transition: Bounce,
//               });
//   }
    console.log(data);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginSchema,
  });

  const inputs = [
    {
      id: 'email',
      type: 'email',
      name: 'email',
      title: 'User Email',
      value: formik.values.email,
      onChange: formik.handleChange,
    },
    {
      id: 'password',
      type: 'password',
      name: 'password',
      title: 'User Password',
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
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));

  return (
    <div className='register-container'>
      <div className='container'>
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit} className="login-form">
          {renderInputs}
          <button type='submit' disabled={!formik.isValid}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
