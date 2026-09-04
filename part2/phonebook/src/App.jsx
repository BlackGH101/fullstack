import { useState, useEffect } from 'react'
import PersonForm from './components/personform'
import Numbers from './components/number'
import Filter from './components/searchFilter'
import PersonsServices from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  const [numbers, setNumbers] = useState('')

  const [newName, setNewName] = useState('')

  const [newID, setNewID] = useState(5)


  useEffect(() => {
    PersonsServices.getAll().then(
      person => {
        console.log(person)
        setPersons(person)
      }
    )
  }, [])

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


    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      const replace = window.confirm(
        `${newName} is already added to phonebook, replace old number with new one?`
      )

      if (replace) {
        const changedPerson = {
          ...personExists,
          number: numbers
        }

        PersonsServices.update(personExists.id, changedPerson).then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person.id === personExists.id ? returnedPerson : person
            )
          )
        })
      }

      return

  }



  setNewID(newID + 1)

  const newPersonObject = {
    name: newName,
    number: numbers,
    id: newID
  }

  console.log(newPersonObject)
  PersonsServices.create(newPersonObject).then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
  })
  /**setPersons(persons.concat(newPersonObject))**/
  setNewName('')
  setNumbers('')
}

const deletePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    PersonsServices.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }
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
    <Numbers personToShow={personToShow}
      deletePerson={deletePerson}
    />
  </div>
)
}

export default App