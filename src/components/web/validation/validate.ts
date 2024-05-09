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
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object({
  email: yup.string().required("Email is Required").email(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
});

export const sendCodeSchema = yup.object({
  email: yup.string().required("Email is Required").email(),
});

export const forgetPasswordSchema = yup.object({
  code: yup.string().required("Code is Required").min(4).max(4),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
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
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required")
    .notOneOf([yup.ref("oldPassword")]),
  cPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
