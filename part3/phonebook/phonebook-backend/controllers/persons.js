const Person = require('../models/person')
const personsRouter = require('express').Router()


// Get information about phonebook
personsRouter.get('/info', (req, res, next) => {
  Person.countDocuments({}).then(count => {
    res.status(200).send(`
		<p>Phonebook has information for ${count} persons.</p>
		<p>${new Date()}</p>
	`)
  }).catch(error => {
    next(error)
  })
})

// Get all persons in phonebook
personsRouter.get('/', (req, res, next) => {
  Person.find({}).then(persons => {
    res.status(200).send(persons)
  }).catch(error => {
    next(error)
  })
})

// Get person by ID from phonebook
personsRouter.get('/:id', (req, res, next) => {
  const personId = req.params.id
  Person.findById(personId).then(person => {
    if(!person) {
      return res.status(404).send({
        httpStatus: 404,
        error: 'Requested person not found'
      })
    }
    res.status(200).send(person)
  }).catch(error => {
    next(error)
  })
})

// Create a new person entry in phonebook
personsRouter.post('/', (req, res, next) => {
  const body = req.body

  if(!(body.name || body.phoneNumber)){
    return res.status(400).send({
      httpStatus: 400,
      error: 'Person name or phone number missing'
    })
  }

  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber
  })

  person.save().then(savedPerson => {
    res.status(201).send(savedPerson)
  }).catch(error => {
    next(error)
  })
})

// Update person details in phonebook by person ID
personsRouter.put('/:id', (req, res, next) => {
  const personId = req.params.id
  const updateData = req.body

  if(!(updateData.name || updateData.phoneNumber)){
    return res.status(400).send({
      httpStatus: 400,
      error: 'Person name or phone number missing'
    })
  }

  Person.findByIdAndUpdate(personId, updateData, { new: true, runValidators: true, context: 'query' })
    .then(person => {
      if(!person) {
        return res.status(404).send({
          httpStatus: 404,
          error: 'Cannot find person to update'
        })
      }
      res.status(200).send(person)
    }).catch(error => {
      next(error)
    })
})


// Delete person from phonebook by person ID
personsRouter.delete('/:id', (req, res, next) => {
  const personId = req.params.id

  Person.findById(personId).then(foundPerson => {
    if(!foundPerson){
      return res.status(404).send({
        httpStatus: 404,
        error: 'Cannot find the person to delete'
      })
    }

    Person.findByIdAndDelete(personId).then(() => {
      res.status(204).end()
    }).catch(error => {
      next(error)
    })
  })
})

module.exports = personsRouter