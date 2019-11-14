// Require environment variables
require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('data',  (req, res) => { return req.method == "POST" ? JSON.stringify(req.body) : null })
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req, res)
  ].join(' ')
}))

app.use(express.static('build'))



let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

// Get model of Person 
const Person = require('./models/person')


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON())
  })
})

// Gets all persons from database
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/info', (req, res) => {
  let info = "<p>" + "Phonebook has info for " + persons.length + (persons.length > 1 ? " people" : " person") + "</p>"
  let date  = "<p>" + new Date() + "</p>"
  res.send(info + date)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})

/*
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
*/

// Posts new person to database
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'body missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })

  /*
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.find(person => person.name == body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }

  const maxIndex = 1000
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomIndex(maxIndex),
  }

  persons = persons.concat(person)
  response.json(person)
  */
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  console.log(PORT)
  console.log(request.headers.host + '/' + request.url)
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)