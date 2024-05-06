import * as yup from "yup";

export const registerSchema = yup.object({
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Must be at least three char")
    .max(30, "Maximum 30 char"),
  email: yup.string().required("Email is Required").email(),
  password: yup
    .string()
    .required("Password is Required")
    .min(8, "Must be at least three char")
    .max(30, "Maximum 30 char"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object({
  email: yup.string().required("Email is Required").email(),
  password: yup
    .string()
    .required("Password is Required")
    .min(8, "Must be at least three char")
    .max(30, "Maximum 30 char"),
});

export const sendCodeSchema = yup.object({
  email: yup.string().required("Email is Required").email(),
});

export const forgetPasswordSchema = yup.object({
  code: yup.string().required("Code is Required"),
  password: yup
    .string()
    .required("Password is Required")
    .min(8, "Must be at least three char")
    .max(30, "Maximum 30 char"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Password is Required")
    .min(8, "Must be at least three characters")
    .max(30, "Maximum 30 characters"),
  newPassword: yup
    .string()
    .required("New password is Required")
    .min(8, "Must be at least three characters")
    .max(30, "Maximum 30 characters")
    .notOneOf([yup.ref("oldPassword")]), 
  cPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
