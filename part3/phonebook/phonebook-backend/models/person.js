const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (v) => {
        // min length: 8, min digits before hyphen: 2 or 3, after hyphen all digits
        return RegExp(/^\d{2,3}-\d{6,}$/).test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
