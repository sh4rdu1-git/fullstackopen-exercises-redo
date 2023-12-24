/* eslint react/prop-types: 0 */

const Header = ({ title }) => {
  //   console.log(title);
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Part = ({ partName, partExercises }) => {
  console.log(`IN Part: ${partName}, ${partExercises}`);
  return (
    <>
      <p>
        {partName} {partExercises}
      </p>
    </>
  );
};

const Content = ({ courseParts }) => {
  let coursePartsList = courseParts.map((part, i) => {
    return (
      <>
        <Part key={i} partName={part.name} partExercises={part.exercises} />
        {/* using 'i' as key is not recommended */}
      </>
    );
  });
  return <ul>{coursePartsList}</ul>;
};

// const Total = (props) => {
//   const partExercises = [
//     props.parts[0].exercises,
//     props.parts[1].exercises,
//     props.parts[2].exercises,
//   ];

//   return (
//     <>
//       <p>
//         Number of exercises{" "}
//         {partExercises[0] + partExercises[1] + partExercises[2]}
//       </p>
//     </>
//   );
// };

const Course = ({ course }) => {
  console.log(course);
  return (
    <>
      <Header title={course.name} />
      <Content courseParts={course.parts} />
    </>
  );
};

export default Course;
