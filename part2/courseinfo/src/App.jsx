/* eslint react/prop-types: 0 */

import Course from "./components/Course";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
      {
        name: "Redux",
        exercises: 10,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
