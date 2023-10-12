const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.partName} {props.numberOfExercises}
      </p>
    </>
  );
};

const Content = (props) => {
  const partNames = [
    props.parts[0].name,
    props.parts[1].name,
    props.parts[2].name,
  ];

  const partExercises = [
    props.parts[0].exercises,
    props.parts[1].exercises,
    props.parts[2].exercises,
  ];

  return (
    <>
      <Part partName={partNames[0]} numberOfExercises={partExercises[0]} />
      <Part partName={partNames[1]} numberOfExercises={partExercises[1]} />
      <Part partName={partNames[2]} numberOfExercises={partExercises[2]} />
    </>
  );
};

const Total = (props) => {
  const partExercises = [
    props.parts[0].exercises,
    props.parts[1].exercises,
    props.parts[2].exercises,
  ];

  return (
    <>
      <p>
        Number of exercises{" "}
        {partExercises[0] + partExercises[1] + partExercises[2]}
      </p>
    </>
  );
};

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
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
