import { useState } from 'react'
import PersonForm from './components/personform'
import Numbers from './components/number'
import Filter from './components/searchFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [search, setSearch] = useState('')

  const [numbers, setNumbers] = useState('')

  const [newName, setNewName] = useState('')

  const [newID, setNewID] = useState(5)

  const handleSetSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }


  const createNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const createNewNumber = (event) => {
    console.log(event.target.value)
    setNumbers(event.target.value)
  }

  const createSetPerson = (event) => {
    event.preventDefault()



    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    setNewID(newID + 1)

    const newPersonObject = {
      name: newName,
      number: numbers,
      id: newID
    }

    console.log(newPersonObject)
    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNumbers('')
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        search={search}
        handleSetSearch={handleSetSearch}
      />
      <h2>
        add a new
      </h2>
      <PersonForm
        onSubmit={createSetPerson}
        newName={newName}
        onNameChange={createNewName}
        number={numbers}
        onNumberChange={createNewNumber}
      />
      <Numbers personToShow={personToShow}/>
    </div>
  )
}

export default App