import { useState } from 'react'


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Title = (props) => {
    return (
      <div>
        <h1>{props.text}</h1>
      </div>
    )
  }

const Statistics = (props) => {
  if(props.good + props.neutral + props.bad === 0){
  return (
    <div>
      <p>{props.text}</p>
    </div>
  )
  
}else {
  return (
    <div>
      <table>
      <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value={(props.good*1 + props.neutral*0 + props.bad*-1)/(props.good + props.neutral + props.bad)} />
      <StatisticLine text="positive" value={`${(props.good/(props.good + props.neutral + props.bad)) * 100}%`} />
      </tbody>
      </table>
    </div>
  )
}
}
const Button = (props) => {
    return (
      <button onClick={props.onClick}>{props.text}</button>
    )
  }
  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const goodRating = () => {
    setGood(good + 1)
}

const neutralRating = () => {
    setNeutral(neutral + 1)
}

const badRating = () => {
    setBad(bad + 1)
}


  return (
    <div>
      <Title text='give feedback'/>
      <div>
      <Button text='good' onClick={goodRating}/>
      <Button text='neutral' onClick={neutralRating}/>
      <Button text='bad' onClick={badRating}/>
      </div>
      
      <h1>statistics</h1>
      <Statistics text='No feedback yet' good={good} neutral={neutral} bad={bad}/>

      
      
    </div>
  )
}

export default App