import React, { useState, useEffect } from 'react';
import personService from './services/personService';
import './app.css'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setNewFilterQuery] = useState('')
  const [message,setMessage] = useState('')

  useEffect(() => {
    personService
      .getPersons()
      .then(data => setPersons(data))
      .catch((e) => {
        alert(e)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let personIndex = persons.findIndex(person => person.name === newName)
    if (personIndex === -1) {
      const newPerson = { name: newName, number: newNumber }
      personService
        .addPerson(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setMessage(`Added ${data.name}`)
          setTimeout(()=>setMessage(''),5000)
        })
        .catch(e => alert(e))
    }
    else if (window.confirm(`Change the nuber of ${persons[personIndex].name} ?`)) {
      let personCopy = { ...persons[personIndex], number: newNumber }
      personService
        .updatePerson(personCopy)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== returnedPerson.id
              ? person
              : returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (person) => {
    if (window.confirm(`delete ${person.name} ?`))
      personService
        .deletePerson(person)
        .then((responce) => {
          setPersons(persons.filter(personIterator => personIterator.id !== person.id))
        })
        .catch(e => {
          alert(`${person.name} has already been deleted`)
        })
  }

  const updateNameInput = (event) => setNewName(event.target.value)
  const updatePhoneInput = (event) => setNewNumber(event.target.value)
  const updateFilterInput = (event) => setNewFilterQuery(event.target.value)

  const formData = {
    newName: newName,
    newNumber: newNumber,
    updateNameInput: updateNameInput,
    updatePhoneInput: updatePhoneInput,
    addPerson: addPerson
  }

  return (
    <div>
      <Headline text='Filter' />
      <Filter updateHandler={updateFilterInput} />
      <Headline text='Add new' />
      <Notification message={message}/>
      <AddForm data={formData} />
      <Headline text='Numbers' />
      <Numbers persons={persons} filterQuery={filterQuery} deleteHandler={deletePerson} />
    </div>
  );
}

const Headline = ({ text }) => <h2>{text}</h2>

const Person = ({ person, deleteHandler }) =>
  <div>{person.name} {person.number} <button onClick={() => { deleteHandler(person) }}>delete</button></div>

const Numbers = ({ persons, filterQuery, deleteHandler }) => {

  const getPersonsUI = () => persons.filter(person =>
    person.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1
  ).map(person =>
    <Person person={person}
      key={person.name} deleteHandler={deleteHandler} />)
  return (
    <div>
      {getPersonsUI()}
    </div>
  )
}

const AddForm = ({ data }) => (
  <form>
    <div>
      name: <input value={data.newName} onChange={data.updateNameInput} />
    </div>
    <div>
      number: <input value={data.newNumber} onChange={data.updatePhoneInput} />
    </div>
    <button type='submit' onClick={data.addPerson}>add</button>
  </form>
)

const Filter = ({ updateHandler }) => (
  <div>
    filter shown with <input onChange={updateHandler} />
  </div>
)

const Notification = ({ message }) => {
  if (message === '')
    return null
  else
    return (
      <div className='notification'>
        {message}
      </div>
    )
}
export default App;
