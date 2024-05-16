import * as yup from "yup";
import i18n from "../../../i18n/config";

export const RegisterSchema = yup.object({
  userName: yup
    .string()
    .required(i18n.t("validation.usernameRequired"))
    .min(3, i18n.t("validation.userNameMinLength"))
    .max(30, i18n.t("validation.userNameMaxLength")),
  email: yup
    .string()
    .required(i18n.t("validation.emailRequired"))
    .email(i18n.t("validation.validEmail")),
  password: yup
    .string()
    .min(8, i18n.t("validation.passwordLength"))
    .matches(/[0-9]/, i18n.t("validation.containsNumber"))
    .matches(/[a-z]/, i18n.t("validation.containsLowercase"))
    .matches(/[A-Z]/, i18n.t("validation.containsUppercase"))
    .required(i18n.t("validation.PasswordRequired")),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], i18n.t("validation.passwordMatch"))
    .required(i18n.t("validation.cPasswordRequired")),
});

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required(i18n.t("validation.emailRequired"))
    .email(i18n.t("validation.validEmail")),
  password: yup
    .string()
    .min(8, i18n.t("validation.passwordLength"))
    .required(i18n.t("validation.PasswordRequired")),
});

export const SendCodeSchema = yup.object({
  email: yup
    .string()
    .required(i18n.t("validation.emailRequired"))
    .email(i18n.t("validation.validEmail")),
});

export const ForgetPasswordSchema = yup.object({
  code: yup
    .string()
    .min(4, i18n.t("validation.codeLength"))
    .max(4, i18n.t("validation.codeLength"))
    .required(i18n.t("validation.codeRequired")),
  password: yup
    .string()
    .min(8, i18n.t("validation.passwordLength"))
    .matches(/[0-9]/, i18n.t("validation.containsNumber"))
    .matches(/[a-z]/, i18n.t("validation.containsLowercase"))
    .matches(/[A-Z]/, i18n.t("validation.containsUppercase"))
    .required(i18n.t("validation.PasswordRequired")),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], i18n.t("validation.passwordMatch"))
    .required(i18n.t("validation.cPasswordRequired")),
});

export const ChangePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .min(8, i18n.t("validation.passwordLength"))
    .required(i18n.t("validation.PasswordRequired")),
  newPassword: yup
    .string()
    .min(8, i18n.t("validation.passwordLength"))
    .matches(/[0-9]/, i18n.t("validation.containsNumber"))
    .matches(/[a-z]/, i18n.t("validation.containsLowercase"))
    .matches(/[A-Z]/, i18n.t("validation.containsUppercase"))
    .required(i18n.t("validation.PasswordRequired"))
    .notOneOf(
      [yup.ref("oldPassword")],
      i18n.t("validation.newPasswordRequired")
    ),
  cPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), undefined],
      i18n.t("validation.passwordMatch")
    )
    .required(i18n.t("validation.cPasswordRequired")),
});
