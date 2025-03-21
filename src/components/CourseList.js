import React from "react";
import course1Image from "../assets/images/dts_banner.png";
import course2Image from "../assets/images/dsa_banner.png";
import course3Image from "../assets/images/dttt1_banner.png";

const courses = [
  { title: "ĐIỆN TỬ SỐ - ET3220", image: course1Image },
  { title: "CẤU TRÚC DỮ LIỆU VÀ GIẢI THUẬT - ET2100", image: course2Image },
  { title: "ĐIỆN TỬ TƯƠNG TỰ I - ET3230", image: course3Image }
];

function CourseList() {
  return (
    <div className="about-page">
      <div className="mui-style">
        <div className="toplist-title">Danh sách khóa học</div>
        <div className="columns-listcourse">
          {courses.map((course, index) => (
            <div key={index} className="single-column">
              <div className="single-course">
                <div className="image-course" style={{ backgroundImage: `url(${course.image})` }}></div>
                <div className="title-course">
                  <div className="text-course-title">{course.title}</div>
                  <div className="is-premium">🔥</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
