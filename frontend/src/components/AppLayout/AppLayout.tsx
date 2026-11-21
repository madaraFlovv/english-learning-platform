import { NavLink, Outlet } from "react-router-dom";
import "./AppLayout.css";

const AppLayout = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">e</div>

          <div className="brand-text">
            <span className="brand-name">english path</span>
            <span className="brand-caption">LEARNING PLATFORM</span>
          </div>
        </div>

        <nav className="sidebar-navigation">
          <span className="sidebar-label">LEARNING</span>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="navigation-icon">01</span>
            <span>Roadmap</span>
          </NavLink>

          <NavLink
            to="/ai"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="navigation-icon">02</span>
            <span>AI tutor</span>
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="navigation-icon">03</span>
            <span>Account</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="sidebar-note-label">YOUR LEARNING JOURNEY</span>
            <p>Small steps every day make a difference.</p>
          </div>

          <span className="sidebar-version">ENGLISH PATH · 2026</span>
        </div>
      </aside>

      <main className="main-area">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
