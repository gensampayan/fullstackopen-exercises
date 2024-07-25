import { useState } from 'react'

const Button = (props) => {

  return (
    <>
      <button onClick={props.onGoodClick}>good</button>
      <button onClick={props.onNeutralClick}>neutral</button>
      <button onClick={props.onBadClick}>bad</button>
    </>
  )
}

const Statistics = (props) => {
  return(
    <>
      <div>{props.text} {props.value}</div>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(prevGood => prevGood + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(prevNeutral => prevNeutral + 1);
  }

  const handleBadClick = () => {
    setBad(prevBad => prevBad + 1);
  }

  const all = good + neutral + bad;
  const average = all / 3;
  const positive = good + neutral;

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onGoodClick={handleGoodClick}
        onNeutralClick={handleNeutralClick}
        onBadClick={handleBadClick}
      />

      <h1>statistics</h1>
      <Statistics 
        text="good"
        value={good}
      />
      <Statistics 
        text="neutral"
        value={neutral}
      />
      <Statistics 
        text="bad"
        value={bad}
      />
      <div>all {all}</div>
      <div>average {average} %</div>
      <div>positive {positive} %</div>
    </div>
  )
}

export default App
