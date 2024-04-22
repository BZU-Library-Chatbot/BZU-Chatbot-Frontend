import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import tariq from "../../../assets/Images/tariq.jpg";
import aziza from "../../../assets/Images/aziza.jpeg";
import raghad from "../../../assets/Images/raghad.jpeg";

const Index = () => {
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      name: t("about.tariq"),
      role: t("about.tariqRole"),
      img: tariq,
      fb: "https://www.facebook.com/profile.php?id=100016606080937&mibextid=LQQJ4d",
      linkedin: "https://www.linkedin.com/in/tariq-quraan-42a079248/",
      github: "https://github.com/RoOtT24",
    },
    {
      id: 2,
      name: t("about.aziza"),
      role: t("about.azizaRole"),
      img: aziza,
      fb: "https://www.facebook.com/aziza.karakra",
      linkedin: "https://www.linkedin.com/in/aziza-karakra-8a8231253/",
      github: "https://github.com/azizakarakra",
    },
    {
      id: 3,
      name: t("about.raghad"),
      role: t("about.raghadRole"),
      img: raghad,
      fb: "https://www.facebook.com/profile.php?id=100008148251170",
      linkedin: "https://www.linkedin.com/in/raghad-aqel-6ba112260/",
      github: "https://github.com/Raghad-Aqel",
    },
  ];

  const renderProfiles = data.map((item) => {
    return (
      <div className={styles.profile} key={item.id}>
        <figure data-value={item.role}>
          <img src={item.img} alt={item.name} title={item.name} />
          <div className={styles.imageInfo}>
            <figcaption>{item.name}</figcaption>
            <div className={styles.social}>
              <a target="blank" href={item.github} className={styles.link}>
                <i className="fa-brands fa-github"></i>
              </a>
              <a target="blank" href={item.fb} className={styles.link}>
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a target="blank" href={item.linkedin} className={styles.link}>
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </figure>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.aboutBody}>
        <header>
          <div className={styles.title}>
            <h3>{t("about.team")}</h3>
          </div>
          <div className={styles.content}>
            <h5>{t("about.whoWeAre")}</h5>
            <p>{t("about.whoWeAreBody")}</p>
          </div>
        </header>
        <main>{renderProfiles}</main>
      </div>
    </div>
  );
};

export default Index;
