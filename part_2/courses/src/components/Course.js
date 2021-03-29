import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = (props) => {
  console.log(props);
  const courses = props.course;
  return (
    <div>
      {courses.map((course) => {
        return (
          <>
            <Header text={course.name} />
            <Content parts={course.parts}></Content>
          </>
        );
      })}
    </div>
  );
};

export default Course;
