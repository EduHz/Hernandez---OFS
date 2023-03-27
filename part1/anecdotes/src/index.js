import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const AnecdoteOfTheDay = (props) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdote}</p>
      <p>has {props.vote} votes</p>
      <button onClick={props.handleVote}>Vote</button>
      <button onClick={props.handleSelect}>Next anecdote</button>
    </>
  );
};

const AnecdoteWithMostVotes = (props) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      {props.maxVote ? (
        <div>
          <p>{props.bestAnecdote}</p>
          <p>has {props.maxVote} votes</p>
        </div>
      ) : (
        <p>No votes given</p>
      )}
    </>
  );
};

const GenerateRandom = () => Math.floor(Math.random() * (6 - 1 + 1) + 0);

const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const maxVote = Math.max(...points);
  const bestAnecdote = anecdotes[points.indexOf(maxVote)];

  const handleSelect = () => {
    let anecdoteRandom = GenerateRandom(anecdotes.length);
    while (anecdoteRandom === selected) {
      anecdoteRandom = GenerateRandom(anecdotes.length);
    }
    setSelected(anecdoteRandom);
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        vote={points[selected]}
        handleVote={handleVote}
        handleSelect={handleSelect}
      />
      <AnecdoteWithMostVotes bestAnecdote={bestAnecdote} maxVote={maxVote} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
