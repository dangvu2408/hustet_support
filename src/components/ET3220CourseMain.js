import React from "react";

function ET3220CourseMain () {
    return (
        <main id="main">
            <div className="container_et">
                <div className="container_heading">
                    <a href="/" className="back_home">
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
                                                <li><strong>35 </strong> bài học</li>
                                            </ul>
                                            <div className="toggle_more">
                                                Mở rộng tất cả
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cirriculum_panel">
                                        <div className="panel_group">
                                            <div className="panel">
                                                <div className="panel_heading">
                                                    <h5 className="panel_title">
                                                        <div className="head_line_title">
                                                            1. Cơ bản điện tử số
                                                            <span className="time_section">
                                                                6 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse"></div>
                                            </div>

                                            <div className="panel">
                                                <div className="panel_heading">
                                                    <h5 className="panel_title">
                                                        <div className="head_line_title">
                                                            2. Hệ logic tổ hợp
                                                            <span className="time_section">
                                                                8 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse"></div>
                                            </div>

                                            <div className="panel">
                                                <div className="panel_heading">
                                                    <h5 className="panel_title">
                                                        <div className="head_line_title">
                                                            3. Hệ mạch logic dãy
                                                            <span className="time_section">
                                                                6 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse"></div>
                                            </div>

                                            <div className="panel">
                                                <div className="panel_heading">
                                                    <h5 className="panel_title">
                                                        <div className="head_line_title">
                                                            4. Thiết kế mạch trên máy tính (CAD)
                                                            <span className="time_section">
                                                                15 bài học
                                                            </span>
                                                        </div>
                                                    </h5>
                                                </div>
                                                <div className="panel_collapse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col_wrapper col_right"></div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default ET3220CourseMain;