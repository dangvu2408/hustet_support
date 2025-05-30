import React from "react";
import Premium from "./Premium";
import Basic from "./Basic";

export default function CourseListItem({ 
        course_id,
        index,
        course_name,
        english_name,
        child_management,
        managing_department,
        weight,
        description,
        price,
        old_price,
        thumbnail,
        progress = 0, // % tiến độ học
        subtime,
    }) {
    return (
        <div className="table__body">
            <div className="header_left">
                <div className="course_counter_head index__">{index + 1}</div>
                <div className="course_basic_info">
                    <div className="course_thumb">
                        <img src={thumbnail} alt={course_name} width={"120px"} height={"60px"}></img>
                    </div>
                    <div className="course_right_info">
                        <div className="course_title_a">
                            <span className="course_title_text">{course_name} - {course_id}</span>
                        </div>
                        <div className="course_description_a">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
            <div className="header_right">
                <div className="ahead_right_item">
                    {price === "Miễn phí" ? (
                        <Basic/>
                    ) : (
                        <Premium/>
                    )}
                </div>
                <div className="ahead_right_item">Đã thanh toán</div>
                <div className="ahead_right_item">{subtime}</div>
                <div className="ahead_right_item">Tiến độ</div>
            </div>
        </div>
    );
}