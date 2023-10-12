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
  // console.log(`In CONTENT component: ${props.parts}`);
  return (
    <>
      <Part partName={props.parts[0]} numberOfExercises={props.exercises[0]} />
      <Part partName={props.parts[1]} numberOfExercises={props.exercises[1]} />
      <Part partName={props.parts[2]} numberOfExercises={props.exercises[2]} />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.exercises[0] + props.exercises[1] + props.exercises[2]}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1.name, part2.name, part3.name]}
        exercises={[part1.exercises, part2.exercises, part3.exercises]}
      />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  );
};

export default App;
