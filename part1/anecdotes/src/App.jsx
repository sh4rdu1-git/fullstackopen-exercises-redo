/* eslint react/prop-types: 0 */
import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const votesArr = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesArr);

  const addVoteHandler = () => {
    // we create a copy of votes array by using map method and while doing so we increment
    // the vote count of the currently selected anecdote. Then this copy array is passed to
    // the state-changing function
    const votesCopy = votes.map((voteCount, i) => {
      if (i == selected) {
        return voteCount + 1;
      } else return voteCount;
    });

    setVotes(votesCopy);
  };

  const nextAnecdoteHandler = () => {
    let randomisedNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomisedNumber);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={addVoteHandler}>vote</button>
      <button onClick={nextAnecdoteHandler}>Next anecdote</button>
    </div>
  );
};

export default App;
