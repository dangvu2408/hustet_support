import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserListItemComp from "./UserListItemComp";

function UserManagementComp() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    
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


    useEffect(() => {
        if (user && user.role === 1) {
            fetch("http://localhost:3001/users")
                .then(res => res.json())
                .then(data => {
                    setUsers(data);
                })
                .catch(err => {
                    console.error("ERR-5:", err);
                });
        }
    }, [user]);

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
                    <div className="user_heading_title">
                        <h1 class="course_name_heading">Quản lý người dùng</h1>
                    </div>

                    <div className="table_user_container">
                        <div className="table__header">
                            <div className="header_left" style={{width: "40%"}}>
                                <div className="user_counter_head">STT</div>
                                <div className="user_basic_info_head">Họ và tên</div>
                            </div>
                            <div className="header_right" style={{width: "60%"}}>
                                <div className="ahead_right_item">MSSV</div>
                                <div className="ahead_right_item">Giới tính</div>
                                <div className="ahead_right_item">Ngày sinh</div>
                                <div className="ahead_right_item">Quyền</div>
                                <div className="ahead_right_item">Trạng thái</div>
                                <div className="ahead_right_item">Hành động</div>
                            </div>
                        </div>

                        {users.map((user, index) => (
                            <UserListItemComp
                                key={user.username}
                                index={index}
                                fullname={user.fullname}
                                username={user.username}
                                gender={user.gender}
                                dob={user.dob}
                                role={user.role}
                                status={user.status}
                                avatar={user.avatar}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UserManagementComp;