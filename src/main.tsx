import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "./i18n/config";
import i18 from "i18next";
import { Provider } from 'react-redux';
import store from './redux/store';

i18.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>
);
