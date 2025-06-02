import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/blank_avatar.jpg';
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';
import UserItem from "./UserListItem";
import CourseItemVerA from "./CourseItemVerA";
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';

function UpdateUserInfoField() {
    const [user, setUser] = useState(null);
    const [showDropdownSetting, setShowDropdown] = useState(false); // Khai báo state cho dropdown
    const navigate = useNavigate();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const fileInputRef = useRef(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);  // dòng gây lỗi nếu storedUser là undefined hoặc chuỗi sai định dạng
                setUser(parsedUser);
            } catch (error) {
                console.error("ERR-6:", error);
            }
        }
    }, []);

    const [newFullname, setNewFullname] = useState("");
    const [newDOB, setNewDOB] = useState("");


    const [charCounts, setCharCounts] = useState({});
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCharCounts(prev => ({
            ...prev,
            [id]: value.length
        }));
    };

    const toggleDropdown = () => {
        if (showDropdownSetting) {
            setShowDropdown(false);
        } else {
            setDropdownVisible(true);
            setShowDropdown(true);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setBackgroundImage(event.target.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:3001/upload-thumbnail", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        if (data?.url) {
            setThumbnail(data.url);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedFullname = newFullname.trim() !== "" ? newFullname : user.fullname;
        const gender = document.querySelector('input[name="kid_content"]:checked')?.parentElement?.innerText.trim();

        const payload = {
            username: user.username,
            fullname: updatedFullname,
            dob: newDOB.trim() || null,
            gender,
            avatar: thumbnail || null, // lấy từ setThumbnail sau khi upload thành công
        };

        const res = await fetch("http://localhost:3001/update-userinfo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        navigate("/profile");
    };


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

                <form onSubmit={handleUpdate}>
                    <div className="wrapper_container">
                        <div className="user_heading_title">
                            <h1 class="course_name_heading">Cập nhật thông tin cá nhân</h1>
                            {user && user.role === 1 ? ( <p className="admin_or_user" style={{marginTop: '15px', marginLeft: '10px'}}>ADMIN</p> ) : user && ( <p className="user_or_admin" style={{marginTop: '15px', marginLeft: '10px'}}>USER</p> )}
                        </div>

                        <div className="main_update_container">
                            <header className="header_update_child">
                                <div className="header_user_flexitem">
                                    <img src={user?.avatar ? user.avatar : Logo} alt="User Avatar" sizes="50" height={50} width={50} className="avatar_flexitem"/>
                                    <div className="flexitem_auto">
                                        <h1 className="headtxt_name_auto">
                                            <a href="\profile" className="name_color_focus">
                                                {user ? user.fullname : "Chưa đăng nhập"}
                                                <span className="id_color_unfocus"> ({user ? user.username : "Chưa đăng nhập"})</span>
                                            </a>
                                        </h1>
                                        <div className="account_status_auto header_update_child">
                                            <p className="status_color_unfocus margin_top">
                                                {user && user.role === 1 ? ("Tài khoản quản trị viên") : ("Tài khoản cá nhân")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <a href="\profile" className="button_to_profile">Đi đến trang cá nhân</a>
                            </header>
                            <div className="row_wrapper" style={{marginTop: '20px'}}>
                                <div className="col_wrapper col_left">
                                    <div className="update_info_form">
                                        <div class="form_group ">
                                            <label for="title">
                                                Họ và tên đầy đủ
                                                <span class="required"> (bắt buộc)</span>
                                                <span class="tooltip" title="Nhập họ và tên đầy đủ.">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                    </svg>
                                                </span>
                                            </label>
                                            <input id="new_fullname_input" maxlength="100" placeholder={user && user.fullname} type="text" value={newFullname} onChange={(e) => {handleInputChange(e); setNewFullname(e.target.value)}}></input>
                                            <span class="char-count" id="char-count-name">0/100</span>
                                        </div>

                                        <div class="form_group ">
                                            <label for="title">
                                                Ngày sinh
                                                <span class="tooltip" title="Nhập ngày sinh, định dạng dd/mm/yyyy.">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                    </svg>
                                                </span>
                                            </label>
                                            <input id="new_dob_input" maxlength="10" placeholder={user?.dob ?? "Nhập ngày sinh dạng dd/mm/yyyy"} type="text" value={newDOB} onChange={(e) => {handleInputChange(e); setNewDOB(e.target.value)}}></input>
                                            <span class="char-count" id="char-count-name">0/10</span>
                                        </div>

                                        <div class="radio_group">
                                            <label for="title">
                                                Giới tính
                                                <span class="tooltip" title="Chọn giới tính.">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                    </svg>
                                                </span>
                                            </label>
                                            <div className="radio_flex">
                                                <label class="radio_option">
                                                    <input type="radio" name="kid_content" defaultChecked={true}/>
                                                    <span class="custom_radio"></span>
                                                    Nam
                                                </label>

                                                <label class="radio_option">
                                                    <input type="radio" name="kid_content"  />
                                                    <span class="custom_radio"></span>
                                                    Nữ
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col_wrapper col_right">
                                    <div className="avatar_update_cont">
                                        <label for="title">
                                            Ảnh đại diện
                                        </label>
                                        <div className="avatar_upload_field">
                                            <img src={backgroundImage || thumbnail || user?.avatar || Logo} alt="User Avatar" sizes="200" height={200} width={200} className="avatar_flexitem"/>
                                            <div className="button_edit_avt" onClick={toggleDropdown}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                Chỉnh sửa
                                            </div>
                                            {isDropdownVisible  && (
                                                <div className={`dropdown_avt_setting ${showDropdownSetting ? "show_setting" : ""}`}>
                                                    <ul>
                                                        <li onClick={handleUploadClick}>Tải ảnh lên...</li>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            ref={fileInputRef}
                                                            style={{ display: "none" }}
                                                            onChange={handleFileChange}
                                                        />
                                                        <li onClick={() => navigate("/change-password")}>Xóa ảnh</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_level">
                                <button className="add_course_button" type="submit">Cập nhật thông tin</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );

}

export default UpdateUserInfoField;