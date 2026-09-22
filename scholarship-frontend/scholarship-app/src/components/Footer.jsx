import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/about">About Us</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/faq">FAQ</Link>

        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>

      <p>© 2026 Scholarship Management System</p>
    </footer>
  );
}

export default Footer;
