import React from "react";
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';


function CourseItemVerA({
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
    progress = 0, // % tiến độ học
}) {
    const parsePrice = (str) => parseFloat(str.replace(/\./g, ''));
    const discount = Math.round(((parsePrice(old_price) - parsePrice(price)) / parsePrice(old_price)) * 100);

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
                </div>
                <div className="more_of_course">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
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

export default CourseItemVerA;
