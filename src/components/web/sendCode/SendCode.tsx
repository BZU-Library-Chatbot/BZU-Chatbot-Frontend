import React from 'react'
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { toast, Bounce } from "react-toastify";
import { loginSchema } from "../validation/validate";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SendCode.module.scss";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import authService from "../../../services/authService";
// import { sensCode } from "./api";
import { useTranslation } from "react-i18next";

interface FormValues {
    email: string;
}

const SendCode: React.FC = () => {
  const { t } = useTranslation();
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated());
  const navigate = useNavigate();

  return (
    <div>SendCode</div>
  )
}

export default SendCode;
