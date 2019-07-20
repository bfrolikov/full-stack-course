import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-123456789'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setNewFilterQuery] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    persons.findIndex(person => person.name === newName) === -1
      ? setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
      : alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
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
      <Filter updateHandler={updateFilterInput}/>
      <Headline text='Add new' />
      <AddForm data={formData} />
      <Headline text='Numbers' />
      <Numbers persons={persons} filterQuery={filterQuery} />
    </div>
  );
}

const Headline = ({ text }) => <h2>{text}</h2>

const Person = ({ name, number }) =>
  <div>{name} {number}</div>

const Numbers = ({ persons, filterQuery }) => {

  const getPersonsUI = () => persons.filter(person =>
    person.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1
  ).map(person =>
    <Person name={person.name} number={person.number}
      key={person.name} />)

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

const Filter = ({ updateHandler }) => {
  return (
    <div>
      filter shown with <input onChange={updateHandler} />
    </div>
  )
}
export default App;
