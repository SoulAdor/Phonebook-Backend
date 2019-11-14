const mongoose = require('mongoose')

// Password and link to database
const url = process.env.MONGODB_URI

// Connect to url
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url, { useNewUrlParser: true }).then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

// Define schema for structure
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// Remove _id and __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Return model for person
module.exports = mongoose.model('Person', personSchema)