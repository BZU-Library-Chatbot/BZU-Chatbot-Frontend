import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const RegisterSchema = () => {
  const { t } = useTranslation();

  return yup.object({
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
};

export const LoginSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    email: yup
      .string()
      .required(t("validation.emailRequired"))
      .email(t("validation.validEmail")),
    password: yup.string().required(t("validation.PasswordRequired")),
  });
};

export const SendCodeSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    email: yup
      .string()
      .required(t("validation.emailRequired"))
      .email(t("validation.validEmail")),
  });
};

export const ForgetPasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    code: yup
      .string()
      .min(4, t("validation.codeLength"))
      .max(4, t("validation.codeLength"))
      .required(t("validation.codeRequired")),
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
};

export const ChangePasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    oldPassword: yup
      .string()
      .min(8, t("validation.passwordLength"))
      .required(t("validation.PasswordRequired")),
    newPassword: yup
      .string()
      .min(8, t("validation.passwordLength"))
      .matches(/[0-9]/, t("validation.containsNumber"))
      .matches(/[a-z]/, t("validation.containsLowercase"))
      .matches(/[A-Z]/, t("validation.containsUppercase"))
      .required(t("validation.PasswordRequired"))
      .notOneOf([yup.ref("oldPassword")], t("validation.newPasswordRequired")),
    cPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), undefined], t("validation.passwordMatch"))
      .required(t("validation.cPasswordRequired")),
  });
};
