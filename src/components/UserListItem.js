import React from "react";
import Basic from "./Basic";
import Plus from "./Plus";
import Premium from "./Premium";

export default function UserListItem({ user }) {
    return (
        <tr>
            <td style={{fontFamily: 'SFPro Bold'}}>{user.fullname}</td>
            <td>{user.username}</td>
            <td>{user.gender || "Chưa cập nhật"}</td>
            <td>{user.dob || "Chưa cập nhật"}</td>
            <td className="user_role_td" >{user.role === 1 ? (
                <p className="admin_or_user">ADMIN</p>
            ) : (
                <p className="user_or_admin">USER</p>
            )}</td>
            <td>{
                user.status === 1 ? <Basic />
                : user.status === 2 ? <Plus />
                : user.status === 3 ? <Premium />
                : "Ẩn"
            }</td>
        </tr>
    );
}
