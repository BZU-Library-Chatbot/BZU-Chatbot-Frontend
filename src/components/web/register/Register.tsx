import React from 'react';
import Input from '../../pages/Input'; 
import { useFormik } from 'formik';
import { toast, Bounce  } from 'react-toastify';
import { registerSchema } from '../validation/validate';
import './Register.css'; 
import api from "../../../services/Api"


interface FormValues {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}

const Register: React.FC = () => {
  const initialValues: FormValues = {
    userName: '',
    email: '',
    password: '',
    cPassword: '',
  };

  const onSubmit = async (users: FormValues) => {
    // const formData = new FormData();
    // formData.append("userName",users.userName);
    // formData.append("email",users.email);
    // formData.append("password",users.password);
    // formData.append("cPassword",users.cPassword);

    console.log(users);

    const data = await api.post('/auth/signup',users)
    if (data.message=='success'){
      formik.resetForm();
          toast('Account created successfully! Please verify your email to login!', {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
  }
    console.log(data);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerSchema,
  });

  const inputs = [
    {
      id: 'username',
      type: 'text',
      name: 'userName',
      title: 'User Name',
      value: formik.values.userName,
      onChange: formik.handleChange,
    },
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
    {
      id: 'cPassword',
      type: 'password',
      name: 'cPassword',
      title: 'Confirm Password',
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
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));

  return (
    <div className='register-container'>
      <div className='container'>
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit} className="register-form">
          {renderInputs}
          <button type='submit' disabled={!formik.isValid}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
