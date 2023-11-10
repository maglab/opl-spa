import { Fragment } from "react";
import styles from "./NavMenu.module.css"

function NavMenu2() {
  const menuList = [
    { title: "Home", route: "/open-problems/" }
    // { title: "About", route: "/about" },
    // { title: "Search", route: "/question" },
  ];
  return (
    <Fragment>
      <a href="https://longevityknowledge.com" target="_blank">
        <div className={styles.nav_title_div}>
          <h1 className="nav-title text-xl font-bold">Open Longevity</h1>
          <span className={styles.nav_version}>{import.meta.env.VITE_BUILD_VERSION}</span>
        </div>
      </a>
      <ul className="nav-list list-none flex flex-row items-center gap-6 h-full">
        {menuList.map((item) => {
          return (
            <li key={item.title} className="h-full">
              <a href={item.route} rel='noreferrer' target="" className="hover:bg-slate-200 px-2 flex items-center h-full transition-colors duration-250">{item.title}</a>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default NavMenu2;
