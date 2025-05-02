import React from "react";
import { useState, useEffect } from "react";
import Dialog from './dialog/CourseDialog';

// const digitArray = Array.from({ length: 10 }, (_, i) => i.toString());


function DigitScroller({ digit, delay }) {
    const [targetPos, setTargetPos] = useState(0);

    

    useEffect(() => {
        const isDigit = /\d/.test(digit);
        if (!isDigit) return; 

        const timeout = setTimeout(() => {
            setTargetPos(parseInt(digit) * 28); 
        }, delay); 

        return () => clearTimeout(timeout);
    }, [digit, delay]);

    const isDigit = /\d/.test(digit);

    if (!isDigit) {
        return (
            <span style={{ display: "inline-block", textAlign: "center" }}>
                {digit}
            </span>
        );
    }

    return (
        <div
            style={{
                display: "inline-block",
                width: 20,
                height: 28,
                overflow: "hidden",
                lineHeight: "28px",
                fontFamily: "SFPro Black",
                textAlign: "center",
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    transform: `translateY(-${targetPos}px)`,
                    transition: "transform 0.5s ease-out",
                }}>
                {[...Array(10).keys()].map((num) => (
                    <div key={num}>{num}</div>
                ))}
            </div>
        </div>
    );
}

function ScrollingNumber({ value = "299.000" }) {
    return (
        <h5
            style={{
                fontSize: 28,
                fontFamily: "SFPro Black",
                margin: 0,
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                color: "#003366",
            }}
        >
            {value.split("").map((char, i) => (
                <DigitScroller key={i} digit={char} delay={i * 50} />
            ))}
            <span style={{ marginLeft: 6, fontFamily: 'SFPro Black' }}>VNĐ</span>
        </h5>
    );
}


function ET3220CourseMain () {
    const [openPanels, setOpenPanels] = useState([false, false, false, false]);



    const togglePanel = (index) => {
        setOpenPanels(prev => {
            const newPanels = [...prev];
            newPanels[index] = !newPanels[index];
            return newPanels;
        });
    };

    const toggleAllPanels = () => {
        setOpenPanels(prev => {
            const allOpen = prev.every(isOpen => isOpen);
            return prev.map(() => !allOpen);
        });
    };

    const[showDialog, setShowDialog] = useState(false);
    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);


    return (
        <main id="main">
            <div className="container_et">
                <div className="container_heading">
                    <a href="#" className="back_home" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                        <span className="subtitle_back">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Quay lại</span>
                        </span>
                    </a>
                </div>
                <div className="wrapper_container">
                    <div className="row_wrapper">
                        <div className="col_wrapper col_left">
                            <div className="course_content">
                                <div>
                                    <h1 className="course_name_heading">ET3220 - Điện tử số</h1>
                                    <div className="course_description">
                                    Môn học này sẽ trang bị cho sinh viên năm thứ 3 ngành kỹ thuật các kiến thức cơ bản về điện tử số và thiết kế mạch số ở mức cổng. Cụ thể là sinh viên hiểu về đại số Boolean ứng dụng trong điện tử số, các hệ cơ số đếm, cách biểu diễn và các phép toán cơ bản bởi mạch số, mô tả mạch điện tử số và tìm lời giải, cấu trúc mạch logic tổ hợp của các mạch chức năng cơ bản và nâng cao, hiểu về các mạch dãy để thiết kế và phân tích chức năng của mạch dãy. Môn học cũng cung cấp cho sinh viên kỹ năng thực hành và thái độ cần thiết khi làm thực nghiệm, giới thiệu các bước thiết kế và thực hiện mạch điện tử số trên bo mạch cũng như trên phần mềm CAD, và phát triển kỹ năng làm việc nhóm và báo cáo.
                                    </div>
                                </div>
                                <div className="course_curriculum">
                                    <div className="header_course_cir">
                                        <div className="header_curriculum">
                                            <h2>Nội dung tóm tắt của học phần</h2>
                                        </div>
                                        <div className="sub_header_wrapper">
                                            <ul>
                                                <li class="chapter_sub"><strong>4 </strong> chương</li>
                                                <li class="dot_sub">•</li>
                                                <li><strong>34 </strong> bài học</li>
                                            </ul>
                                            <div className="toggle_more" onClick={toggleAllPanels}>
                                                {openPanels.every(isOpen => isOpen) ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cirriculum_panel">
                                        <div className="panel_group">
                                            <div className="panel">
                                                <div className="panel_heading" onClick={() => togglePanel(0)}>
                                                    <h5 className="panel_title">
                                                        <div className={`head_line_title ${openPanels[0] ? 'open' : ''}`}>
                                                            1. Cơ bản điện tử số
                                                            <span className="time_section">
                                                                6 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse" style={{ display: openPanels[0] ? "block" : "none" }}>
                                                    <div className="panel_body">
                                                        <div>
                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">1. Hệ thống số và tương tự</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">2. Các hệ cơ số đếm và biểu diễn</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">3. Các mã nhị phân</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">4. Các cổng logic cơ bản (AND, OR, NOT, NOR, NAND, XOR, XNOR)</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">5. Đại số Boolean và hàm logic</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">6. Định lý mở rộng Shannon</div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="panel">
                                                <div className="panel_heading" onClick={() => togglePanel(1)}>
                                                    <h5 className="panel_title">
                                                        <div className={`head_line_title ${openPanels[1] ? 'open' : ''}`}>
                                                            2. Hệ logic tổ hợp
                                                            <span className="time_section">
                                                                8 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse" style={{ display: openPanels[1] ? "block" : "none" }}>
                                                    <div className="panel_body">
                                                        <div>
                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">1. Định nghĩa mạch tổ hợp</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">2. Tối thiểu hoá các hàm logic</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">3. Các phương pháp tối thiểu hóa có hỗ trợ bởi máy tính</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">4. Các ví dụ tối ưu hóa hàm logic</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">5. Công nghệ thực hiện mạch số</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">6. Tổng hợp các mạch logic tổ hợp</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">7. Hazard trong hệ logic tổ hợp</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">8. Các khối mạch logic tổ hợp cơ bản</div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="panel">
                                                <div className="panel_heading" onClick={() => togglePanel(2)}>
                                                    <h5 className="panel_title">
                                                        <div className={`head_line_title ${openPanels[2] ? 'open' : ''}`}>
                                                            3. Hệ mạch logic dãy
                                                            <span className="time_section">
                                                                6 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse" style={{ display: openPanels[2] ? "block" : "none" }}>
                                                    <div className="panel_body">
                                                        <div>
                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">1. Mô hình mạch logic dãy</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">2. Các loại phần tử nhớ</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">3. Các mạch dãy cơ bản</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">4. Thiết kế mạch dãy đồng bộ</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">5. Thiết kế mạch logic dãy không đồng bộ</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">6. Phân tích mạch dãy đồng bộ</div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="panel">
                                                <div className="panel_heading" onClick={() => togglePanel(3)}>
                                                    <h5 className="panel_title">
                                                        <div className={`head_line_title ${openPanels[3] ? 'open' : ''}`}>
                                                            4. Thiết kế mạch trên máy tính (CAD)
                                                            <span className="time_section">
                                                                14 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse" style={{ display: openPanels[3] ? "block" : "none" }}>
                                                    <div className="panel_body">
                                                        <div>
                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">1. Các bước thiết kế</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">2. Công cụ hỗ trợ thiết kế</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">3. Một số ví dụ thiết kế dùng CAD</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">4. Giới thiệu về ngôn ngữ mô tả phần cứng</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">5. Cấu trúc của một chương trình</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">6. Các kiểu dữ liệu và tín hiệu</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">7. Các toán tử</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">8. Các ví dụ về một chương trình</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">9. Các cấu trúc điều khiển if, case, for</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">10. Các khai báo trong chương trình</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">11. Cách tổ chức chương trình, thủ tục và hàm</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">12. Chương trình mô tả mạch tổ hợp</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">13. Chương trình mô tả các mạch tuần tự</div>
                                                                </span>
                                                            </div>

                                                            <div className="lesson_item">
                                                                <span className="icon_link">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                                    <div className="lesson_name">14. Chương trình mô tả FSM</div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col_wrapper col_right">
                            <div className="purchase_badge">
                                <div className="img_preview">
                                    <div className="background_igm_prv"></div>
                                    <p className="showMoreCourse" onClick={openDialog} style={{ cursor: 'pointer'}}>Xem thông tin về học phần</p>
                                    <Dialog show={showDialog} onClose={closeDialog} title="Thông tin học phần">
                                        <div className="group_items_info">
                                            <div className="custom_item_info">
                                                <div className="item_info_title">Đơn vị:</div>
                                                <span className="item_info_value">Trường Điện - Điện tử</span>
                                            </div>

                                            <div className="custom_item_info">
                                                <div className="item_info_title">Đơn vị con:</div>
                                                <span className="item_info_value">Khoa Điện tử, Trung tâm Đào tạo thực hành Điện - Điện tử</span>
                                            </div>

                                            <div className="custom_item_info">
                                                <div className="item_info_title">Mã học phần:</div>
                                                <span className="item_info_value">ET3220</span>
                                            </div>

                                            <div className="custom_item_info">
                                                <div className="item_info_title">Tên học phần:</div>
                                                <span className="item_info_value">Điện tử số</span>
                                            </div>

                                            <div className="custom_item_info">
                                                <div className="item_info_title">Tên tiếng anh:</div>
                                                <span className="item_info_value">Digital Electronics</span>
                                            </div>

                                            <div className="custom_item_info">
                                                <div className="item_info_title">Phân bổ:</div>
                                                <span className="item_info_value">3(3-0-1-6)</span>
                                            </div>

                                            <div className="custom_item_info">
                                                <div className="item_info_title">Đề cương chi tiết:</div>
                                                <span className="item_info_value" onClick={() => window.open("/assets/et3220_-_dien_tu_so_73.0k.pdf", "_blank")} style={{ cursor: "pointer" }}>et3220_-_dien_tu_so_73.0k.pdf</span>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                                <ScrollingNumber value="299.000" />
                                <button type="button" href="" class="wrapper_button">
                                    <span class="inner_button">
                                        <span class="title_inner_btn">ĐĂNG KÍ KHÓA HỌC</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ET3220CourseMain;