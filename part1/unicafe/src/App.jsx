import { useState } from "react";
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

      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {totalFeedbacks}</p>
      <p>Average {(1 * good + 0 * neutral + -1 * bad) / totalFeedbacks}</p>
      <p>Positive {(good / totalFeedbacks) * 100}%</p>
    </div>
  );
};

export default App;
