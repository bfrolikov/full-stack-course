import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const arr = Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0)
    const [votes, setVotes] = useState(arr)

    const displayRandom = () => {
        setSelected(Math.floor(Math.random() * props.anecdotes.length))
    }

    const addVote = (index) => {
        const votesCopy = [...votes]
        votesCopy[index] += 1
        setVotes(votesCopy)
    }

    const anecdoteData = {
        voteHandler: () => addVote(selected),
        nextHandler: displayRandom,
        selectedAnecdote: props.anecdotes[selected],
        votes: votes[selected]
    }
    return (
        <div>
            <AnectodeOfTheDay anecdoteData={anecdoteData} />
            <MostVotes anecdotesPr={props.anecdotes} votes={votes}/>
        </div>
    )
}

const AnectodeOfTheDay = ({ anecdoteData }) => {
    return (
        <div>
            <Headline text="Anectode of the day" />
            <p>{anecdoteData.selectedAnecdote}</p>
            <p>has {anecdoteData.votes} votes</p>
            <Button text="next anecdote" onClick={anecdoteData.nextHandler} />
            <Button text="vote" onClick={anecdoteData.voteHandler} />
        </div>
    )
}

const MostVotes = ({ anecdotesPr, votes }) => {
    const maxVotes = Math.max(...votes)
    return (
        <div>
            <Headline text="Anecdote with most votes" />
            <p>{anecdotesPr[votes.indexOf(maxVotes)]}</p>
            <p>has {maxVotes} votes</p>
        </div>
    )
}
const Button = ({ text, onClick }) =>
    <button onClick={onClick}>{text}</button>

const Headline = ({ text }) => <h1>{text}</h1>

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)