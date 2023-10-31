/* eslint react/prop-types: 0 */
import { useState } from "react";

const Button = ({ btnText, clickHandler }) => {
  return <button onClick={clickHandler}>{btnText}</button>;
};

const StatisticsLine = ({ statText, statValue }) => {
  return (
    <p>
      {statText} {statValue} {statText == "Positive" && "%"}
    </p>
  );
};

const Statistics = (props) => {
  // render this if total feedbacks given are zero
  if (!props.totalFeedbacks) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <StatisticsLine statText="Good" statValue={props.good} />
      <StatisticsLine statText="Neutral" statValue={props.neutral} />
      <StatisticsLine statText="Bad" statValue={props.bad} />
      <StatisticsLine statText="All" statValue={props.totalFeedbacks} />
      <StatisticsLine
        statText="Average"
        statValue={
          (1 * props.good + 0 * props.neutral + -1 * props.bad) /
          props.totalFeedbacks
        }
      />
      <StatisticsLine
        statText="Positive"
        statValue={(props.good / props.totalFeedbacks) * 100}
      />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotalFeedbacks(totalFeedbacks + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotalFeedbacks(totalFeedbacks + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setTotalFeedbacks(totalFeedbacks + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button btnText="Good" clickHandler={handleGoodClick} />
      <Button btnText="Neutral" clickHandler={handleNeutralClick} />
      <Button btnText="Bad" clickHandler={handleBadClick} />

      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedbacks={totalFeedbacks}
      />
    </div>
  );
};

export default App;
