import LoginButton from "./Buttons/LoginButton";
import ProblemsButton from "./Buttons/ProblemsButton";
import styles from "./NavMenu.module.css";
import Logo from "../../../assets/svg/OpenLongevityLogo.svg?react";
import withSVG from "../../../utils/hoc/withSVG";

const defaultSvgProps = {
  width: "80px",
  height: "80px",
};

const LogoSVG = withSVG(Logo, defaultSvgProps);

function NavMenu2() {
  const menuList = [
    { title: "Home", route: "/" },
    // { title: "About", route: "/about" },
    // { title: "Search", route: "/question" },
  ];

  return (
    <div className=" max-w-7xl items-center justify-between w-full flex flex-row h-fit">
      <a href="https://longevityknowledge.com" target="_blank" rel="noreferrer">
        <div className={styles.nav_title_div}>
          <LogoSVG />
          <span className={styles.nav_version}>
            {import.meta.env.VITE_BUILD_VERSION}
          </span>
        </div>
      </a>
      <ul className="nav-list list-none flex flex-row items-center gap-6 h-full">
        {menuList.map((item) => {
          return (
            <li
              key={item.title}
              className=" hover:bg-slate-200 p-2 rounded-sm  "
            >
              <a
                href={item.route}
                rel="noreferrer"
                target=""
                className="flex items-center h-full transition-colors duration-250 text-sm"
              >
                {item.title}
              </a>
            </li>
          );
        })}
        <LoginButton />
        <ProblemsButton />
      </ul>
    </div>
  );
}

export default NavMenu2;
