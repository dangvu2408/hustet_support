import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Premium from "./Premium";
import Basic from "./Basic";
import Plus from "./Plus";
import Dialog from './dialog/CourseDialog';


export default function UserListItemComp({
    index,
    fullname,
    username,
    gender,
    dob,
    role,
    status,
    avatar
}) {
    const navigate = useNavigate(); 
    const[showEditDialog, setShowEditDialog] = useState(false);
    const[showDeleteDialog, setShowDeleteDialog] = useState(false);
    const openEditDialog = () => setShowEditDialog(true);
    const closeEditDialog = () => setShowEditDialog(false);
    const openDeleteDialog = () => setShowDeleteDialog(true);
    const closeDeleteDialog = () => setShowDeleteDialog(false);

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);  // dòng gây lỗi nếu storedUser là undefined hoặc chuỗi sai định dạng
                setUser(parsedUser);
            } catch (error) {
                console.error("ERR-4:", error);
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedFullname = newFullname.trim() !== "" ? newFullname : fullname;
        const updatedDOB = newDOB.trim() !== "" ? newDOB : dob;
        const newgender = document.querySelector('input[name="kid_content"]:checked')?.parentElement?.innerText.trim();
        const newrole = parseInt(document.querySelector('input[name="user_role"]:checked')?.value);
        const newstatus = parseInt(document.querySelector('input[name="user_status"]:checked')?.value);


        const payload = {
            username: username,
            fullname: updatedFullname,
            dob: updatedDOB,
            gender: newgender,
            avatar: avatar,
            role: newrole,
            status: newstatus
        };

        console.log(payload);

        const res = await fetch("http://localhost:3001/update-userinfo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (result.success) {
            alert("Cập nhật thành công!");
            closeEditDialog(); 
        } else {
            alert(result.message || "Cập nhật thất bại.");
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await fetch("/delete-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username }) 
            });

            const result = await res.json();

            if (result.success) {
                if (username === user.username) {
                    alert("Tài khoản của bạn đã bị xóa. Đang đăng xuất...");
                    navigate("/login");
                    localStorage.removeItem("authToken");
                } else {
                    alert("Xóa người dùng thành công!");
                    closeDeleteDialog(); 
                }
            } else {
                alert(result.message || "Xóa thất bại.");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi server khi xóa.");
        }
    };



    return (
        <div className="table__body">
            <div className="header_left" style={{width: "40%"}}>
                <div className="user_counter_head index___">{index + 1}</div>
                <div className="user_basic_info">{fullname}</div>
            </div>
            <div className="header_right" style={{width: "60%"}}>
                <div className="ahead_right_item">{username}</div>
                <div className="ahead_right_item">{gender || "Chưa cập nhật"}</div>
                <div className="ahead_right_item">{dob || "Chưa cập nhật"}</div>
                <div className="ahead_right_item">{role === 1 ? (
                    <p className="admin_or_user">ADMIN</p>
                ) : (
                    <p className="user_or_admin">USER</p>
                )}</div>
                <div className="ahead_right_item">{
                    status === 1 ? <Basic />
                    : status === 2 ? <Plus />
                    : status === 3 ? <Premium />
                    : "Ẩn"
                }</div>
                <div className="ahead_right_item" style={{display: "flex", gap: "15px", justifyContent: "space-around"}}>
                    <svg onClick={openEditDialog} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B00D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    <svg onClick={openDeleteDialog} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F24E42" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </div>
            </div>

            <Dialog show={showEditDialog} onClose={closeEditDialog} title="Chỉnh sửa thông tin người dùng">
                <form onSubmit={handleUpdate}>
                    <div style={{minWidth: "500px"}}>
                        <div className="update_info_form" style={{gap: "10px"}}>
                            <div class="form_group ">
                                <label for="title">
                                    Họ và tên đầy đủ
                                    <span class="required"> (bắt buộc)</span>
                                    <span class="tooltip" title="Nhập họ và tên đầy đủ.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </span>
                                </label>
                                <input id="new_fullname_input" maxlength="100" placeholder={fullname} type="text" value={newFullname} onChange={(e) => {handleInputChange(e); setNewFullname(e.target.value)}}></input>
                                <span class="char-count" id="char-count-name">{charCounts['new_fullname_input'] || 0}/100</span>
                            </div>

                            <div class="form_group ">
                                <label for="title">
                                    Ngày sinh
                                    <span class="tooltip" title="Nhập ngày sinh, định dạng dd/mm/yyyy.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </span>
                                </label>
                                <input id="new_dob_input" maxlength="10" placeholder={dob ?? "Nhập ngày sinh dạng dd/mm/yyyy"} type="text" value={newDOB} onChange={(e) => {handleInputChange(e); setNewDOB(e.target.value)}}></input>
                                <span class="char-count" id="char-count-name">{charCounts['new_dob_input'] || 0}/10</span>
                            </div>

                            <div class="radio_group">
                                <label for="title">
                                    Giới tính
                                    <span class="tooltip" title="Chọn giới tính.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </span>
                                </label>
                                <div className="radio_flex" style={{gap: "0px"}}>
                                    <label class="radio_option" style={{width: "33.333333%"}}>
                                        <input type="radio" name="kid_content" defaultChecked={gender === "Nam"}/>
                                        <span class="custom_radio"></span>
                                        Nam
                                    </label>

                                    <label class="radio_option" style={{width: "33.333333%"}}>
                                        <input type="radio" name="kid_content" defaultChecked={gender === "Nữ"}/>
                                        <span class="custom_radio"></span>
                                        Nữ
                                    </label>
                                </div>

                                <label for="title">
                                    Quyền
                                    <span class="tooltip" title="Chọn quyền.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </span>
                                </label>

                                <div className="radio_flex" style={{gap: "0px"}}>
                                    <label class="radio_option" style={{width: "33.333333%"}}>
                                        <input type="radio" name="user_role" value={0} defaultChecked={role != 1}/>
                                        <span class="custom_radio"></span>
                                        <p class="user_or_admin">USER</p>
                                    </label>

                                    <label class="radio_option" style={{width: "33.333333%"}}>
                                        <input type="radio" name="user_role" value={1} defaultChecked={role === 1} />
                                        <span class="custom_radio"></span>
                                        <p class="admin_or_user">ADMIN</p>
                                    </label>
                                </div>

                                <label for="title">
                                    Trạng thái tài khoản
                                    <span class="tooltip" title="Chọn trạng thái tài khoản.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </span>
                                </label>

                                <div className="radio_flex" style={{gap: "0px"}}>
                                    <label class="radio_option" style={{width: "33.333333%"}}>
                                        <input type="radio" name="user_status" value={1} defaultChecked={status === 1}/>
                                        <span class="custom_radio"></span>
                                        <Basic />
                                    </label>

                                    <label class="radio_option" style={{width: "33.333333%"}}>
                                        <input type="radio" name="user_status" value={2} defaultChecked={status === 2} />
                                        <span class="custom_radio"></span>
                                        <Plus />
                                    </label>

                                    <label class="radio_option" style={{width: "33.333333%"}}>
                                        <input type="radio" name="user_status" value={3} defaultChecked={status === 3} />
                                        <span class="custom_radio"></span>
                                        <Premium />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="footer_level">
                            <button className="update_btn__" type="submit">Cập nhật thông tin</button>
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog show={showDeleteDialog} onClose={closeDeleteDialog} title="Xóa người dùng">
                <div className="flex">
                    <span className="confirm_text">Xác nhận xóa tài khoản {username}?</span>
                    <div class="info_box_container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        <span aria-hidden="true" class="text_info_box">Khi bạn xác nhận xóa tài khoản, người dùng sẽ không thể đăng nhập tài khoản này nữa.</span>
                    </div>
                    <div className="group_confirm_btn">
                        <button className="cancel_btn__" type="button" onClick={closeDeleteDialog}>Hủy</button>
                        <button className="delete_btn__" type="button" onClick={handleDeleteUser}>Xác nhận xóa</button>
                    </div>
                </div>
            </Dialog>
        </div>

    );
}
