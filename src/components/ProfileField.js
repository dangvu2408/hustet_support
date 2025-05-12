
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/blank_avatar.jpg';
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';
import UserItem from "./UserListItem";
import CourseItemVerA from "./CourseItemVerA";

function ProfileField() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);  // dòng gây lỗi nếu storedUser là undefined hoặc chuỗi sai định dạng
                setUser(parsedUser);
                console.log("User loaded:", parsedUser);
            } catch (error) {
                console.error("Lỗi parse JSON:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (user && user.role === 1) {
            fetch("http://localhost:3001/users")
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setUsers(data);
                })
                .catch(err => {
                    console.error("Lỗi users 001:", err);
                });
        }
    }, [user]);
      

    
    return(
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
                    <div className="user_heading_title">
                        <h1 class="course_name_heading">Thông tin tài khoản</h1>
                        {user && user.role === 1 ? ( <p className="admin_or_user" style={{marginTop: '15px', marginLeft: '10px'}}>ADMIN</p> ) : user && ( <p className="user_or_admin" style={{marginTop: '15px', marginLeft: '10px'}}>USER</p> )}
                    </div>
                    <div className="grid_layout_container">
                        <div className="grid_layout_left">
                            <div className="grid_card">
                                <div className="profile_field">
                                    <div className="avatar_field">
                                        <span className="avatar_span_field">
                                            <img className="main_avatar_img" src={Logo} width={'250px'} height={'250px'}></img>
                                        </span>
                                        <div className="user_status">
                                            <div className="user_status_context">
                                                <svg width="54" height="20" viewBox="0 0 54 20" fill="none">
                                                    <rect width="54" height="20" rx="4" fill="#9457FF"></rect>
                                                    <g clip-path="url(#clip0_3541_4068)" transform="scale(1.5, 1.5)">
                                                        <path d="M9.84391 4.29638C9.49475 4.15267 9.08127 4.08081 8.61267 4.08081H6.2972C6.21451 4.08081 6.141 4.10776 6.08587 4.16165C6.03074 4.21554 6.00317 4.2874 6.00317 4.36824V9.62273C6.00317 9.70357 6.03074 9.77542 6.08587 9.82931C6.141 9.88321 6.21451 9.91015 6.2972 9.91015H7.41818C7.50088 9.91015 7.57438 9.88321 7.62951 9.82931C7.69383 9.77542 7.73059 9.70357 7.73059 9.61374V7.9341H8.62186C9.09046 7.9341 9.50394 7.87123 9.84391 7.7365C10.2023 7.60177 10.4871 7.3862 10.68 7.10776C10.8822 6.82033 10.9833 6.46105 10.9833 6.02991C10.9833 5.59877 10.8822 5.22153 10.68 4.9341C10.4871 4.64668 10.2023 4.43111 9.84391 4.2874V4.29638ZM9.26504 6.02093C9.26504 6.2365 9.20991 6.38919 9.08127 6.49698C8.96183 6.60476 8.79644 6.64967 8.57591 6.64967H7.70302V5.38321H8.57591C8.824 5.38321 8.99858 5.44608 9.09965 5.56285C9.20991 5.68859 9.25585 5.84129 9.25585 6.02093H9.26504Z" fill="#FEFFFF"></path>
                                                        <path d="M16.6064 8.51794H14.199V4.36824C14.199 4.2874 14.1623 4.20656 14.1072 4.16165C14.052 4.10776 13.9785 4.08081 13.905 4.08081H12.8116C12.7289 4.08081 12.6554 4.10776 12.6003 4.16165C12.5451 4.21554 12.5176 4.2874 12.5176 4.36824V9.62273C12.5176 9.70357 12.5451 9.77542 12.6003 9.82931C12.6554 9.88321 12.7289 9.91015 12.8116 9.91015H16.6064C16.6891 9.91015 16.7626 9.88321 16.8177 9.82931C16.882 9.77542 16.9188 9.70357 16.9188 9.61374V8.80536C16.9188 8.72452 16.882 8.64368 16.8269 8.59877C16.7718 8.5359 16.6983 8.50895 16.6064 8.50895V8.51794Z" fill="#FEFFFF"></path>
                                                        <path d="M23.0391 3.99976H21.964C21.8905 3.99976 21.817 4.02749 21.7527 4.08296C21.6976 4.13843 21.67 4.21239 21.67 4.2956V7.63304C21.67 7.96586 21.5873 8.21547 21.4311 8.37264C21.2749 8.5298 21.0636 8.60376 20.7787 8.60376C20.4939 8.60376 20.2642 8.5298 20.108 8.37264C19.9518 8.20623 19.8783 7.95661 19.8783 7.63304V4.2956C19.8783 4.21239 19.8507 4.13843 19.7956 4.08296C19.7404 4.02749 19.6669 3.99976 19.5842 3.99976H18.5184C18.4357 3.99976 18.3622 4.02749 18.3071 4.08296C18.2519 4.13843 18.2244 4.21239 18.2244 4.2956V7.64228C18.2244 8.17849 18.3346 8.62225 18.546 8.97356C18.7573 9.32487 19.0605 9.58373 19.4464 9.75939C19.8323 9.9258 20.2826 9.99976 20.7879 9.99976C21.2933 9.99976 21.7527 9.91655 22.1294 9.75939C22.5153 9.59298 22.8185 9.32487 23.0299 8.97356C23.2412 8.62225 23.3515 8.16925 23.3515 7.64228V4.2956C23.3515 4.21239 23.3147 4.13843 23.2596 4.08296C23.2045 4.02749 23.1309 3.99976 23.0574 3.99976H23.0391Z" fill="#FEFFFF"></path>
                                                        <path d="M29.7732 7.27876C29.617 7.04523 29.3781 6.8566 29.0565 6.71289C28.7441 6.56918 28.3306 6.45241 27.8253 6.36259C27.5312 6.29972 27.2923 6.23684 27.1178 6.18295C26.9616 6.12906 26.8513 6.06618 26.787 5.99433C26.7318 5.93145 26.7043 5.8596 26.7043 5.76978C26.7043 5.62606 26.7502 5.52726 26.8605 5.46439C26.9799 5.39253 27.1545 5.34762 27.3842 5.34762C27.5956 5.34762 27.7609 5.39253 27.8804 5.47337C27.9998 5.54523 28.0733 5.63505 28.1009 5.72487V5.75181C28.156 5.81469 28.202 5.8596 28.2663 5.88654C28.3214 5.91349 28.3858 5.92247 28.4593 5.92247H29.5527C29.6262 5.92247 29.6905 5.89552 29.7456 5.84163C29.7916 5.78774 29.8191 5.72487 29.8191 5.66199C29.8191 5.47337 29.7548 5.28475 29.6446 5.09612C29.5435 4.9075 29.3781 4.71888 29.176 4.54822C28.9646 4.37756 28.7073 4.24283 28.4133 4.14403C28.1193 4.04523 27.7701 3.99133 27.3842 3.99133C26.9064 3.99133 26.4838 4.06319 26.1346 4.21588C25.7763 4.36858 25.5006 4.58415 25.2893 4.85361C25.0963 5.12307 24.9952 5.43744 24.9952 5.78774C24.9952 6.13804 25.0779 6.43445 25.2433 6.67696C25.4087 6.91049 25.6476 7.09912 25.9508 7.25181C26.2541 7.38654 26.6216 7.50331 27.0443 7.59313C27.3658 7.656 27.6231 7.71888 27.8161 7.78175C27.9998 7.83564 28.1285 7.89852 28.2112 7.97038C28.2755 8.02427 28.3122 8.10511 28.3122 8.19493C28.3122 8.32966 28.2479 8.43744 28.1101 8.51828C27.9631 8.6081 27.7426 8.65301 27.4394 8.65301C27.2556 8.65301 27.0994 8.63505 26.9891 8.59912C26.8697 8.55421 26.7778 8.50032 26.7043 8.43744C26.64 8.36558 26.5848 8.29373 26.5297 8.21289C26.4929 8.159 26.447 8.11409 26.3919 8.08714C26.3367 8.05121 26.2632 8.03325 26.1622 8.03325H25.1239C25.0504 8.03325 24.9861 8.0602 24.9309 8.11409C24.885 8.159 24.8574 8.22187 24.8574 8.29373C24.8666 8.59014 24.9769 8.87756 25.1698 9.13804C25.3628 9.39852 25.6568 9.61409 26.0335 9.77576C26.4103 9.92846 26.8789 10.0093 27.4394 10.0093C27.9355 10.0093 28.3766 9.93744 28.7625 9.79373C29.1484 9.65002 29.4608 9.43445 29.6813 9.156C29.911 8.86858 30.0213 8.52726 30.0213 8.15002C30.0213 7.8087 29.9478 7.51229 29.7916 7.28774L29.7732 7.27876Z" fill="#FEFFFF"></path>
                                                    </g>
                                                </svg> 
                                            </div>
                                        </div>
                                    </div>

                                    <div className="user_fullname_field">
                                        <span className="full_name_text">{user ? user.fullname : "Chưa đăng nhập"}</span>
                                        <span className="user_id_text">{user ? user.username : "Chưa đăng nhập"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid_layout_right">
                            <div>
                                <span className="main_a_title">Danh sách khóa học đã đăng ký</span>
                                <div className="list_subscribed_course">
                                    <CourseItemVerA
                                        course_id="ET3220"
                                        course_name="Điện tử số"
                                        english_name="Digital Electronics"
                                        child_management="Khối Kỹ thuật"
                                        managing_department="Bộ môn Điện tử"
                                        weight="3"
                                        description="Học phần về logic số, mạch số cơ bản."
                                        price="299.000"
                                        old_price="399.000"
                                        thumbnail={Course1}
                                        progress={80}
                                    />

                                    
                                    <CourseItemVerA
                                        course_id="ET3230"
                                        course_name="Điện tử tương tự I"
                                        english_name="Digital Electronics"
                                        child_management="Khối Kỹ thuật"
                                        managing_department="Bộ môn Điện tử"
                                        weight="3"
                                        description="Học phần về logic số, mạch số cơ bản."
                                        price="199.000"
                                        old_price="299.000"
                                        thumbnail={Course2}
                                        progress={80}
                                    />

                                    <CourseItemVerA
                                        course_id="ET2100"
                                        course_name="Cấu trúc dữ liệu và giải thuật"
                                        english_name="Digital Electronics"
                                        child_management="Khối Kỹ thuật"
                                        managing_department="Bộ môn Điện tử"
                                        weight="3"
                                        description="Học phần về logic số, mạch số cơ bản."
                                        price="259.000"
                                        old_price="359.000"
                                        thumbnail={Course3}
                                        progress={80}
                                    />

                                </div>
                                <div className="see_more_course">
                                    <div className="see_more">
                                        <span className="text_see_more">Xem thêm</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9457FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="main_a_title">Danh sách khóa học đã thêm</span>
                                <div className="list_subscribed_course">
                                    <div className="list_child">
                                        
                                    </div>
                                    
                                    
                                </div>
                                <div className="see_more_course">
                                    <div className="see_more">
                                        <span className="text_see_more">Xem thêm</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9457FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </div>
                                </div>
                            </div>
                            
                            {user && user.role === 1 && (
                                <div>
                                    <span className="main_a_title">Danh sách người dùng</span>
                                    <div className="list_of_user">
                                        <table className="user_table">
                                            <thead className="user_headtable">
                                                <tr>
                                                    <th>Họ và tên</th>
                                                    <th>MSSV</th>
                                                    <th>Giới tính</th>
                                                    <th>Ngày sinh</th>
                                                    <th>Quyền</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="user_tbody">
                                                {users.map(u => (
                                                    <UserItem key={u.username} user={u} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="see_more_course">
                                        <div className="see_more">
                                            <span className="text_see_more">Quản lý người dùng</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9457FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProfileField;