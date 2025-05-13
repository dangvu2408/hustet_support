import React from "react";
import { useNavigate } from 'react-router-dom';
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';

function CourseItemVerB({
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
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/courses/${course_id}`, {
            state: {
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
                progress,
            },
        });
    };



    const parsePrice = (str) => parseFloat(str.replace(/\./g, ''));
    const discount = Math.round(((parsePrice(old_price) - parsePrice(price)) / parsePrice(old_price)) * 100);

    return (
        <div className="single-column">
            <div className="single-course" onClick={handleClick}>
                <div className="image-course-course">
                    <img className="course_thumb_img" src={thumbnail} />
                    <Premium/>
                </div>
                <div className="title-course">
                    <div className="title_context_verB">
                        <span className="text-course-title">{course_name} - {course_id}</span>
                        <div className="course-title_verB">
                            <span class="new_course_price">{price}đ</span>
                            <span class="old_course_price">{old_price}đ</span>
                            <p class="expense_price">Tiết kiệm {discount}%</p>
                        </div>
                    </div>

                    <div className="more_of_course">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CourseItemVerB;
