import { useState } from 'react'

const Button = (props) => {
  return(
  <div>
  <button onClick={props.onClick}>{props.text}</button>
  </div>
  )
}


const App = () => {
const [selected, setSelected] = useState(0)
const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

console.log(votes)

const votesUpdate = () => {
  const newVotes = [...votes]
  newVotes[selected] += 1
  setVotes(newVotes)
}

const randomNumber = () => {
 setSelected(Math.floor(Math.random() * anecdotes.length))
}

const biggest = Math.max(...votes)

const indexOfBiggest = votes.indexOf(biggest)

console.log('The index of the highest vote is', indexOfBiggest)

console.log('highest vote is', biggest)

console.log(votes)
console.log('We are at index', selected)


  return (
    <div>
      <h2><b>Anecdote of the day</b></h2>
      {anecdotes[selected]}
      <Button onClick={randomNumber} text='next anecdote' /><br></br>
      has {votes[selected]} votes
      <Button onClick={votesUpdate} text='vote'/><br></br>
      <h2><b>Anecdote with the most votes</b></h2>
      {anecdotes[indexOfBiggest]}<br/>
      has <b>{biggest}</b> votes
    </div>
  )

  
}

export default App