import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => setGood(good + 1)
    const addNeutral = () => setNeutral(neutral + 1)
    const addBad = () => setBad(bad + 1)

    const data = {
        title: "statictics",
        statistics: [
            {
                type: "good",
                score: good
            },
            {
                type: "neutral",
                score: neutral
            },
            {
                type: "bad",
                score: bad
            },
            {
                type: "all",
                score: good + neutral + bad
            },
            {
                type: "average",
                score: (good - bad) / (good + neutral + bad)
            },
            {
                type: "positive",
                score: good / (good + neutral + bad) * 100 + " %"
            }
        ]
    }
    return (
        <div>
            <Headline text="give feedback" />
            <Button text="good" onClick={addGood} />
            <Button text="neutral" onClick={addNeutral} />
            <Button text="bad" onClick={addBad} />
            <Statistics data={data} />
        </div>
    )
}

const Headline = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick }) =>
    <button onClick={onClick}>{text}</button>

const Statistics = ({ data }) => {
    const statistics = data.statistics
    if (statistics[0].score != 0 || statistics[1].score != 0 || statistics[2].score != 0)
        return (
            <div>
                <Headline text={data.title} />
                <table>
                    <tbody>
                        <Statistic statistic={statistics[0]} />
                        <Statistic statistic={statistics[1]} />
                        <Statistic statistic={statistics[2]} />
                        <Statistic statistic={statistics[3]} />
                        <Statistic statistic={statistics[4]} />
                        <Statistic statistic={statistics[5]} />
                    </tbody>
                </table>
            </div>
        )
    else
        return (
            <div>
                <Headline text={data.title} />
                <p>No feedback given</p>
            </div>
        )
}

const Statistic = ({ statistic }) => (
    <tr>
        <td>{statistic.type}</td>
        <td>{statistic.score}</td>
    </tr>
)
ReactDOM.render(<App />, document.getElementById('root'));

