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
  return <>{coursePartsList}</>;
};

const TotalExercises = ({ courseParts }) => {
  let totalExercisesCount = courseParts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <>
      <strong>Total exercises : {totalExercisesCount}</strong>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content courseParts={course.parts} />
      <TotalExercises courseParts={course.parts} />
    </>
  );
};

export default Course;
