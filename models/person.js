const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

// Password and link to database
const url = process.env.MONGODB_URI

// Connect to url
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useNewUrlParser: true })
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

// Define schema for structure
const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 8 }
})
personSchema.plugin(uniqueValidator);

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