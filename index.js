// Require environment variables
require('dotenv').config()

const express = require('express')
const app = express()

// Static build
app.use(express.static('build'))

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Cross origin policy
const cors = require('cors')
app.use(cors())

// Logger
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

// Get model of Person 
const Person = require('./models/person')



app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    person ?
    response.json(person.toJSON()) :
    response.status(404).end() 
  })
  .catch(error => next(error))
})

// Gets all persons from database
app.get('/api/persons', (request, response, next)  => {
  Person.find({})
  .then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
  .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({}, (err, count) => {
    let info = "<p>" + "Phonebook has info for " + count + (count > 1 ? " people" : " person") + "</p>"
    let date  = "<p>" + new Date() + "</p>"
    response.send(info + date)
   })
   .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

// Posts new person to database
app.post('/api/persons', (request, response, next) => {
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

  person.save()
  .then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
})

// Changes person of database
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  
  const person = {
    name: body.name,
    number: body.number
  }
  
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
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

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)