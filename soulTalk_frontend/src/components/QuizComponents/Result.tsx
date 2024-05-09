// Result.tsx
import React from 'react'
import "../../styles/Quiz.css"
import Quiz from './Quiz';

function Result(props: { score: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; handlePlayAgain: React.MouseEventHandler<HTMLButtonElement> | undefined; }) {
  return (
    <div className="score-section">
      <h2>Completed!</h2>
      <h4>Total Score {props.score}</h4>
      <button onClick={props.handlePlayAgain}>Play Again</button>
    </div>
  )
}

export default Result;