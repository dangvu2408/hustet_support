import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Dialog from '../components/dialog/CourseDialog';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./CourseDetails.css";

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
    const isFree = value === "Miễn phí";

    if (isFree) {
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
                Miễn phí
            </h5>
        );
    }

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
            <span style={{ marginLeft: 6, fontFamily: 'SFPro Black' }}>đ</span>
        </h5>
    );
}



function CourseDetails() {
    const location = useLocation();
    const { course_id } = useParams();
    const courseData = location.state;

    const[showDialog, setShowDialog] = useState(false);
    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <Header />
            
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
                                        <h1 className="course_name_heading">{courseData.course_name} - {courseData.course_id}</h1>
                                        <div className="course_description">
                                            {courseData.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col_wrapper col_right">
                                <div className="purchase_badge">
                                    <div className="img_preview">
                                        <div className="background_igm_prv" style={{backgroundImage: `url(${courseData.thumbnail})`}}></div>
                                        <p className="showMoreCourse" onClick={openDialog} style={{ cursor: 'pointer'}}>Xem thông tin về học phần</p>
                                        <Dialog show={showDialog} onClose={closeDialog} title="Thông tin học phần">
                                            <div className="group_items_info">
                                                <div className="custom_item_info">
                                                    <div className="item_info_title">Đơn vị:</div>
                                                    <span className="item_info_value">{courseData.managing_department}</span>
                                                </div>

                                                <div className="custom_item_info">
                                                    <div className="item_info_title">Đơn vị con:</div>
                                                    <span className="item_info_value">{courseData.child_management}</span>
                                                </div>

                                                <div className="custom_item_info">
                                                    <div className="item_info_title">Mã học phần:</div>
                                                    <span className="item_info_value">{courseData.course_id}</span>
                                                </div>

                                                <div className="custom_item_info">
                                                    <div className="item_info_title">Tên học phần:</div>
                                                    <span className="item_info_value">{courseData.course_name}</span>
                                                </div>

                                                <div className="custom_item_info">
                                                    <div className="item_info_title">Tên tiếng anh:</div>
                                                    <span className="item_info_value">{courseData.english_name}</span>
                                                </div>

                                                <div className="custom_item_info">
                                                    <div className="item_info_title">Phân bổ:</div>
                                                    <span className="item_info_value">{courseData.weight}</span>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>
                                    <ScrollingNumber value={courseData.price} />
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
            
            <Footer />
        </div>
    );
}

export default CourseDetails; 