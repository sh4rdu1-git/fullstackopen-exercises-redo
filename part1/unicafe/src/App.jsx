import { useState } from "react";

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>All {props.totalFeedbacks}</p>
      <p>
        Average{" "}
        {(1 * props.good + 0 * props.neutral + -1 * props.bad) /
          props.totalFeedbacks}
      </p>
      <p>Positive {(props.good / props.totalFeedbacks) * 100}%</p>
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
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>

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
