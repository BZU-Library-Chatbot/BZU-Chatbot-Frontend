import React from "react";
import SidebarCss from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  return (
    <div className={SidebarCss.wrapper}>
    <section className={SidebarCss.sidebar}>
      <button className={SidebarCss.btn}> + New chat</button>
      <ul className={SidebarCss.history}>
        <li>First Chat</li>
      </ul>
      <nav className={SidebarCss.nav}>
        <p>Made by Raghad</p>
      </nav>
    </section>

    </div>
  );
};

export default Sidebar;