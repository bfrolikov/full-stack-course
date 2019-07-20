import React from 'react';

const Course = ({ course }) => (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
)

const Header = ({ course }) => (
    <div>
        <h1>{course.name}</h1>
    </div>
)


const Content = ({ course }) => {
    const parts = course.parts

    const getPartsUI = () => parts.map(part =>
        <Part part={part} key={part.id} />
    )

    return (
        <div>
            {getPartsUI()}
        </div>
    )
}

const Part = ({ part }) => (
    <div>
        <p>{part.name} {part.exercises}</p>
    </div>
)

const Total = ({ course }) => {
    const sumReducer = (accumulator, currentValue) => accumulator + currentValue

    return (
        <p>A total of {course.parts.map(part => part.exercises).reduce(sumReducer)} exercises</p>
    )
}

export default Course