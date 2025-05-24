import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <p>© {new Date().getFullYear()} Recipe Finder | Built with 🍽️ & React</p>
      <div className="social-icons">
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}
