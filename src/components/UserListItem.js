import React from "react";

export default function UserListItem({ user }) {
    return (
        <tr>
            <td><strong>{user.fullname}</strong></td>
            <td>{user.username}</td>
            <td>{user.gender || "Chưa cập nhật"}</td>
            <td>{user.dob || "Chưa cập nhật"}</td>
            <td className="user_role_td" style={{alignItems: 'center'}}>{user.role === 1 ? (
                <p className="admin_or_user">ADMIN</p>
            ) : (
                <p className="user_or_admin">USER</p>
            )}</td>
            <td>{user.status === 1 ? "Hoạt động" : "Ẩn"}</td>
        </tr>
    );
}
