import React from "react";
import CourseList from "./CourseList";
import bannerImage from "../assets/images/c2_building.jpg"; 
function Main() {
  return (
    <main id="main">
      <div className="container">
        <div className="banner-page">
          <img src={bannerImage} alt="Banner" className="banner" />
        </div>
        <CourseList />
      </div>
    </main>
  );
}

export default Main;
