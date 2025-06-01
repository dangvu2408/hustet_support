import React from "react";
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';
import Like from '../assets/images/like.png';
import Liked from '../assets/images/liked.png';
import { useState, useRef, useEffect } from "react";


function CourseItemVerC({
    course_id,
    course_name,
    english_name,
    child_management,
    managing_department,
    weight,
    description,
    price,
    old_price,
    thumbnail,
    progress = 0, 
    subtime
}) {
    const parsePrice = (str) => parseFloat(str.replace(/\./g, ''));
    const discount = Math.round(((parsePrice(old_price) - parsePrice(price)) / parsePrice(old_price)) * 100);
    const [liked, setLiked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [courseCounts, setCourseCounts] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        // Đóng khi click ra ngoài
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        // Đóng khi cuộn trang
        const handleScroll = () => {
            setShowMenu(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll, true); // dùng capture true để bắt trong cả scroll nội bộ

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, []);


    const [bookmarked, setBookmarked] = useState(false);

    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
    };


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && course_id) {
            fetch(`http://localhost:3001/check-like?username=${user.username}&course_id=${course_id}`)
                .then(res => res.json())
                .then(data => setLiked(data.registered))
                .catch(err => console.error("Lỗi khi kiểm tra đăng ký:", err));
        }
    }, [course_id]);
    
    const handleLikeToggle = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !course_id) return;
    
        const url = liked 
            ? "http://localhost:3001/unlike-course"
            : "http://localhost:3001/like-course";
    
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: user.username,
                    course_id: course_id
            })
        })
        .then(res => res.json())
        .then(() => setLiked(!liked))
        .catch(err => console.error("Lỗi khi đăng ký/hủy khóa học:", err));
    };



    useEffect(() => {
        const fetchCounts = async () => {
            const counts = {};
            try {
                const res = await fetch(`http://localhost:3001/count-course-registrations?course_id=${encodeURIComponent(course_id)}`);
                const data = await res.json();
                counts[course_id] = data.count;
            } catch (err) {
                console.error(`Lỗi khi lấy số lượng đăng ký cho course ${course_id}:`, err);
                counts[course_id] = 0;
            }
            setCourseCounts(counts);
        };
    
        if (course_id != null) {
            fetchCounts();
        }
    }, [course_id]);

    useEffect(() => {
        const fetchCounts = async () => {
            const counts = {};
            try {
                const res = await fetch(`http://localhost:3001/count-course-like?course_id=${encodeURIComponent(course_id)}`);
                const data = await res.json();
                counts[course_id] = data.count;
            } catch (err) {
                console.error(`Lỗi khi lấy số lượng đăng ký cho course ${course_id}:`, err);
                counts[course_id] = 0;
            }
            setLikeCounts(counts);
        };
    
        if (course_id != null) {
            fetchCounts();
        }
    }, [course_id]);

    return (
        <div className="list_child">
            <div className="course_main_thumbnail">
                <img className="list_thumbnail" src={thumbnail} alt={course_name}></img>
                <Premium/>
            </div>
            <div className="course_context">
                <div className="course_context_main">
                    <span className="course_title">{course_name} - {course_id}</span>
                    <div className="course_price">
                        <span className="new_course_price">{price}đ</span>
                        <span className="old_course_price">{old_price}đ</span>
                        <p className="expense_price">Tiết kiệm {discount}%</p>
                    </div>
                    <div className="time_of_subscribing">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span className="timer_a1">Thời gian đăng kí: {subtime}</span>
                    </div>
                </div>
                <div className="more_of_course">
                    <button className="more_listbox_btn" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </button>
                    {showMenu && (
                        <div className="portal" ref={menuRef}>
                            <div className="contextmenu_list">
                                <div className="menu">
                                    <ul className="menu--list">
                                        <div className="menu--list-sub">
                                            <div className="course-info-menu">
                                                <div className="course-left">
                                                    <figure className="menu-image-w-80">
                                                        <img src={thumbnail} ></img>
                                                    </figure>
                                                </div>
                                                <div className="course-content-w-150">
                                                    <a>
                                                        <div className="coursetitle-wrapper">
                                                            <span className="listitem-title">{course_name} - {course_id}</span>
                                                        </div>
                                                    </a>

                                                    <div className="course__status">
                                                        <div className="status__item">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                            <span>{courseCounts[course_id] ?? "Đang tải"}</span> 
                                                        </div>
                                                        <div className="status__item">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                                                fill="none" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                className="lucide lucide-bookmark-icon lucide-bookmark">
                                                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                                            </svg>
                                                            <span>{likeCounts[course_id] ?? "Đang tải"}</span> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                    <ul className="menu--list">
                                        <div className="group_button_menu">
                                            <div className="group_button_list">
                                                <button className="button_item" tabIndex={0} onClick={handleLikeToggle}>
                                                    {liked ? (
                                                        // Đã bookmark (màu vàng)
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                                            fill="#E5AC1A" stroke="#E5AC1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                            className="lucide lucide-bookmark-icon lucide-bookmark">
                                                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                                        </svg>
                                                    ) : (
                                                        // Chưa bookmark (outline)
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                                            fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                            className="lucide lucide-bookmark-icon lucide-bookmark">
                                                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                                        </svg>
                                                    )}
                                                    <span>Thêm vào thư viện</span>
                                                </button>

                                                <button className="button_item" tabIndex={0}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                                    <span>Thêm vào thư viện</span>
                                                </button>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
            <div className="progress_course">
                <div className="progress_root">
                    <div className="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={100}></div>
                </div>
            </div>
        </div>
    );
}

export default CourseItemVerC;
