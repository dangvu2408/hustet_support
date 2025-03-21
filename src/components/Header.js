import React from "react";
import hustLogo from "../assets/images/hust.png"; // Đường dẫn ảnh giữ nguyên

function Header() {
  return (
    <header id="hess-header">
      <div className="left-header-section">
        <a href="/">
          <div className="left-section">
            <div className="logo">
              <img src={hustLogo} alt="HUST Logo" className="hess-logo" height="100px" />
            </div>
            <div className="title">
              <p className="bold-text">HỆ THỐNG HỖ TRỢ CƠ SỞ VÀ CỐT LÕI NGÀNH</p>
              <p className="semi-bold-text">
                ĐẠI HỌC BÁCH KHOA HÀ NỘI<br />
                KHOA ĐIỆN TỬ - VIỄN THÔNG
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="right-header-section">
        <a href="/">
          <button type="button" className="btn-login-header">ĐĂNG NHẬP</button>
        </a>
      </div>
    </header>
  );
}

export default Header;
