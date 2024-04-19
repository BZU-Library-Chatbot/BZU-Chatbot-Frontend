import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "./i18n/config";
import i18 from "i18next";

i18.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>
);
