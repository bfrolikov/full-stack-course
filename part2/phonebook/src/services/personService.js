import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios
        .get(baseUrl)
        .then(responce => responce.data)
}

const addPerson = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(responce => responce.data)
}

const deletePerson = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
}

const updatePerson = (person) => {
    return axios
        .put(`${baseUrl}/${person.id}`,person)
        .then(responce => responce.data)
}
export default
    {
        getPersons: getPersons,
        addPerson: addPerson,
        deletePerson: deletePerson,
        updatePerson:updatePerson
    }