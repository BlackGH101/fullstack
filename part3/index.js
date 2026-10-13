require('dotenv').config()

const Phone = require('./models/phonebook')
const express = require('express')
const morgan = require('morgan')


const app = express()


app.use(express.json())
app.use(express.static('dist'))


morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

/*let persons = [
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
*/

app.get('/api/persons', (request, response) => {
  //response.send(persons)
  //console.log(persons)
  Phone.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  response.send(`Phonebook has info for ${Phone.countDocuments()} people <br> 
   <p> ${new Date().toString()} </p>`)

})

app.get('/api/persons/:id', (request, response) => {
  /*const id = request.params.id
  const person = persons.find(person => person.id === id)
  if(person) {
    response.send(person)
  }else{
    response.status(404).end()
  }*/
  Phone.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Phone.findById(request.params.id)
  .then(person => {
    if(!person){
      return response.status(404).end()
    }
    person.name = name
    person.number = number

    return person.save().then((updatedPerson) => {
      response.json(updatedPerson)
    })
  }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response) => {
  Phone.findByIdAndDelete(request.params.id).then(response => {
    response.status(204).end()
  }).catch(error => {
    console.log(error)
  })
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body


  if (!body.name && !body.number) {
    return response.status(404).json({
      error: 'name and number are missing'
    })
  }
  if (!body.name) {
    return response.status(404).json({
      error: 'name is missing'
    })
  }
  if (!body.number) {
    return response.status(404).json({
      error: 'number is missing'
    })
  }

  const person = new Phone({
    //id: generateId(),
    name: body.name,
    number: body.number
  })


  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))

})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)

}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
