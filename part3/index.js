const express = require('express')
const morgan = require('morgan')


const app = express()


app.use(express.json())
app.use(express.static('dist'))


morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]






app.get('/api/persons', (request, response) => {
    response.send(persons)
    //console.log(persons)
})

app.get('/api/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people <br> 
   <p> ${new Date().toString()} </p>`)

})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if(person) {
    response.send(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.filter(person => person.id !== id)
  persons = person
  response.status(200).end()
})

const generateId = () => {
  return String(Math.floor(Math.random() * 100))
}


app.post('/api/persons', (request, response) => {
  const body = request.body


  if(!body.name && !body.number){
    response.status(404).json({
      error: 'name and number are missing'
    })
  }
  if(!body.name){
    return response.status(404).json({
      error: 'name is missing'
    })
  }
   if(!body.number){
    return response.status(404).json({
      error: 'number is missing'
    })
  }
  
  if(persons.find(person => person.name === body.name)){
    return response.status(404).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.send(person)

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})

