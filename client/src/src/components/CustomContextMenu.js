import React, { useState, useEffect } from "react";

export default function CustomContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Xử lý chuột phải
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.pageX, y: e.pageY });
        };

        const handleClickOrScroll = () => setVisible(false);

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClickOrScroll);
        document.addEventListener("scroll", handleClickOrScroll);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClickOrScroll);
            document.removeEventListener("scroll", handleClickOrScroll);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="mouse_context_menu" style={{top: position.y, left: position.x}}>
            <ul className="menulist_">
                <li>
                    <button className="menulist_btn" tabIndex={0} onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span>Quay lại</span>
                    </button>
                </li>

                <li>
                    <button className="menulist_btn" tabIndex={0} onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                        <span>Tải lại trang</span>
                    </button>
                </li>

                <li>
                    <button className="menulist_btn" tabIndex={0} onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span>Trang chủ</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}
