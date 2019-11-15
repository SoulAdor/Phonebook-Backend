const mongoose = require('mongoose')

// Exit if no password provided
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

// Password and link to database. I hope password works
const password = process.argv[2]
const url = `mongodb+srv://Phonebook:${password}@freecluster-eomvq.mongodb.net/phonebook?retryWrites=true&w=majority`

// Connect to url, don't know what second parameter does
mongoose.set('useUnifiedTopology', true)
// Some error?
mongoose.set('useFindAndModify', false)
mongoose.connect(url, { useNewUrlParser: true })
// Define schema for structure
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

// Add person to database
const addPerson = () => {
  const person = new Person({
    name : process.argv[3],
    number: process.argv[4]
  })
  person.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
}

const getAllPersons = () => {
  Person.find({}).then(result => {
    console.log("Phonebook:")
    result.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}

if ( process.argv.length<5 ) getAllPersons()
else addPerson()