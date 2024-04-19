import "./styles.scss";
import { useTranslation } from "react-i18next";

const index = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("errorPage.header")}</h1>
      <p className="zoom-area">
      {t("errorPage.body")}
      </p>
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
      <div className="link-container">
        <a target="_blank" href="/" className="more-link">
        {t("errorPage.backToHome")}
        </a>
      </div>
    </div>
  );
};

export default index;
