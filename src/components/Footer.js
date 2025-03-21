import React from "react";
import hustLogo from "../assets/images/hust.png";

function Footer() {
  return (
    <footer id="hess-footer">
      <div className="footer-container">
        <div className="footer-left-col">
          <a href="https://seee.hust.edu.vn/">
            <div className="footer-logo-seee">
              <img src={hustLogo} alt="HUST" height="100px" />
              <div className="text-slogan">
                <span className="text-modile">ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
                <span className="text-sub-slogan">TRƯỜNG ĐIỆN - ĐIỆN TỬ</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
