import React, { useState } from "react";

const App = () => {
  const Button = (props) => {
    return (
      <div>
        <button onClick={props.handleClick}>{props.text}</button>
      </div>
    );
  };

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));

  const nextQuote = () => {
    const rand = Math.floor(Math.random() * 5 + 1);
    setSelected(rand);
  };

  const incVote = (selected) => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button text="Vote" handleClick={() => incVote(selected)}></Button>
      <Button text="next anecdote" handleClick={nextQuote}></Button>
    </div>
  );
};

export default App;
