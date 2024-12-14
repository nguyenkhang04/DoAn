import React from "react";
import "./styles.scss"

const FooterComponent = () => {
  return (
    <footer className="footer-component">
      <div className="footer-content">
        <ul className="footer-navigation">
          <li className="footer-navigation-item">
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li className="footer-navigation-item">
            <a href="/terms">Terms of Service</a>
          </li>
          <li className="footer-navigation-item">
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
