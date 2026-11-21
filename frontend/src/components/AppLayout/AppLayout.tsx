import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

type Theme = "light" | "dark";
const getInitialTheme = (): Theme => localStorage.getItem("englishly-theme") === "dark" ? "dark" : "light";

const AppLayout = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("englishly-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((current) => current === "light" ? "dark" : "light");

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <NavLink to="/" className={styles.brand} aria-label="Englishly home">
          <span className={styles.brandMark} aria-hidden="true">e</span>
          <span className={styles.brandName}>english<span>ly</span></span>
        </NavLink>
        <div className={styles.sidebarLabel}>YOUR SPACE</div>
        <nav className={styles.navigation} aria-label="Main navigation">
          <NavLink to="/" end className={({isActive}) => isActive ? `${styles.navigationLink} ${styles.active}` : styles.navigationLink}>
            <span className={styles.navigationIcon} aria-hidden="true">⌂</span><span>Learn</span>
          </NavLink>
          <NavLink to="/ai" className={({isActive}) => isActive ? `${styles.navigationLink} ${styles.active}` : styles.navigationLink}>
            <span className={styles.navigationIcon} aria-hidden="true">✳</span><span>AI Tutor</span><span className={styles.newLabel}>NEW</span>
          </NavLink>
          <NavLink to="/account" className={({isActive}) => isActive ? `${styles.navigationLink} ${styles.active}` : styles.navigationLink}>
            <span className={styles.navigationIcon} aria-hidden="true">◎</span><span>Profile</span>
          </NavLink>
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarTip}><span className={styles.tipIcon} aria-hidden="true">✦</span><p>A little practice every day goes a long way.</p></div>
          <span className={styles.sidebarVersion}>ENGLISHLY · BETA</span>
        </div>
      </aside>
      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}><span className={styles.breadcrumbDot} />Your learning space</div>
          <button type="button" className={styles.themeButton} onClick={toggleTheme} aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}>
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
          </button>
        </header>
        <main className={styles.mainContent}><Outlet /></main>
      </div>
    </div>
  );
};
export default AppLayout;