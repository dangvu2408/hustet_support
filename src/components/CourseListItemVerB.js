import React from "react";
import Premium from "./Premium";
import Basic from "./Basic";
import icon from "../assets/images/worldwide.png"

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
        counter,
        like
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
                <div className="ahead_right_item">
                    <div className="display_status_a">
                        <img width={"20px"} height={"20px"} src={icon}></img>
                        <span className="text_status_a">Công khai</span>
                    </div>
                </div>
                <div className="ahead_right_item">{counter}</div>
                <div className="ahead_right_item">{like}</div>
            </div>
        </div>
    );
}