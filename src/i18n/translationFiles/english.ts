import { sendCode } from "../../components/web/sendCode/api";

const English = {
  admin: {},
  about: {
    team: "The creative crew",
    whoWeAre: "Who we are",
    whoWeAreBody:
      "We are a team of Birzeit University students who are passionate about technology and innovation. We are driven by a desire to create solutions that make a positive impact on society. We created this web-based chatbot to complete the requirements of our graduation project. Our goal is to provide a useful and user-friendly tool that helps students access library resources more easily.",
    tariqRole: "Full Stack Developer & AI Engineer",
    azizaRole: "Backend Developer",
    raghadRole: "Frontend Developer",
    tariq: "Tariq Quraan",
    raghad: "Raghad Aqel",
    aziza: "Aziza Karakra",
  },
  home: {
    enterMessage: "Enter your message here",
  },
  login: {
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    forgetPassword: "Forget Password?",
    noAccount: "Don't have an account?",
    invalidCredentials: "Invalid Credentials",
    success: "Login Successful!",
  },
  register: {
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    duplicatedEmail: "Duplicated Email",
    success:
      "Account created successfully! Please verify your email to login!",
  },
  sendCode: {
    email: "Email",
    send: "send",
    login: "Back to Login",
    nonRegiserUser: "Non Register Account",
    success:"Code sent successfully, Check your email.",
  },
  forgetPassword: {
    code: "Code",
    password: "Password",
    confirmPassword: "Confirm Password",
    confirm: "Confirm",
    login: "Back to Login",
    success: "Password updated successfully",
    invalidData: "Invalid Data",
  },
  navbar: {
    menu: "Menu",
  },
  sidebar: {
    newChat: "New Chat",
    logout: "Logout",
    faildUpadateTitle: "Faild to Upaate Conversation Title",
    updateForNonReisterd: "Only registered users can edit session title",
  },
  settings: {
    language: "Language",
    change: "Change Password",
    saved: "Settings saved successfully!",
    passwordChanged: "Password changed successfully!",
    changeImage: "Change Image",
    oldPassword: "Old Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    johnDoe: "John, Doe",
    exampleEmail: "someone@example.com",
    passwordRequirements: "Password requirements",
    requirementsText:
      "To create a new password, you have to meet all of the following requirements:",
    requirements: [
      "Minimum 8 character",
      "At least one special character",
      "At least one number",
      "Can’t be the same as a previous password",
    ],
    errorPicture: "Error changing picture!",
    imageChanged: "Image changed successfully!",
    differentPassword: "Old password and new password can't be the same!",
  },
  global: {
    login: "Login",
    register: "Register",
    copyRights: "© 2023-2024 BZU-Library-Chatbot - All Right Reserved.",
    title: "BZU Library Chatbot",
    home: "Home",
    about: "About",
    serverError: "Internal Server Error!",
    settings: "Settings",
    sendCode: "Send Code",
    forgetPassword: "Forget Password",
  },
  errorPage: {
    header: "404 Error Page",
    body: "Sorry, the page you are looking for could not be found.",
    backToHome: "Back to home",
  },
};

export default English;
