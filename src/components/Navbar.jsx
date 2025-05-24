import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import "./Navbar.css"; // We'll create this next

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <nav className={clsx("navbar", theme)}>
      <div className="navbar__logo">
        <Link to="/">🍳 Recipe Finder</Link>
      </div>
      <ul className="navbar__links">
        <li>
          <Link to="/" className={clsx({ active: location.pathname === "/" })}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className={clsx({ active: location.pathname === "/favorites" })}
          >
            Favorites
          </Link>
        </li>
        <li>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
