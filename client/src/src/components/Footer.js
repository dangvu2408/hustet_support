import React from "react";
import hustLogo from "../assets/images/hust.png";
import googlePlay from "../assets/images/googleplay.png";
import appStore from "../assets/images/appstore.png";

function Footer() {
  return (
    <footer id="hess-footer">
        <div class="footer-container">
            <div class="footer-row">
                <div class="row-col footer-left-col">
                    <a href="https://seee.hust.edu.vn/">
                        <div class="footer-logo-seee">
                            <div class="footer-logo">
                                <span>
                                    <img src={hustLogo} alt="TRƯỜNG ĐIỆN - ĐIỆN TỬ" height="100px"></img> 
                                </span>
                            </div>
                            <div class="text-slogan">
                                <span class="text-modile">ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
                                <span class="text-sub-slogan">TRƯỜNG ĐIỆN - ĐIỆN TỬ</span>
                            </div>
                        </div>
                    </a>
                    <div>
                        <div class="info-footer">
                            <div class="item-info">
                                <div class="icon-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AA1D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div class="content-info">Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</div>
                            </div>
                            <div class="item-info">
                                <div class="icon-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AA1D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div class="content-info">dangquangvu2k4@gmail.com</div>
                            </div>
                            <div class="item-info">
                                <div class="icon-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AA1D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div class="content-info">0383 163 312</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-col footer-right-col">
                    <div class="column-panel">
                        <div class="title-column-panel">
                            Ứng dụng
                            <div class="column-panel-divider"></div>
                        </div>
                        <div className="field-app-install">
                            <a href="/" target="blank">
                                <div className="app-install">
                                <img src={googlePlay} alt="GooglePlay" width="160px"></img>
                                </div>
                            </a>
                            <a href="/" target="blank">
                                <div className="app-install">
                                    <img src={appStore} alt="AppStore" width="160px"></img>
                                </div>
                            </a>
    
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-footer">
                <div class="copyright-bottom">
                    Copyright © 2025 HUST ET SUPPORT SYSTEM. All rights reserved
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
