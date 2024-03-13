require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

// The dist directory contains the FRONTEND build of the application.
// copied from frontend project directory
// To make express show static content, the page index.html and the JavaScript, etc.,
// it fetches, we need a built-in middleware from Express called static.
app.use(express.static("dist"));

// CORS
app.use(cors());

// Should use express.json() middleware to read JSON data from request body
app.use(express.json());

// Use the morgan logger middleware using the custom format.
// Note that express-json-parser middleware should be used before using this morgan logger middleware
morgan.token("reqBody", function getReqBody(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody"
  )
);

// LANDING PAGE / ROOT PATH
app.get("/", (req, res) => {
  res.send("<p>Welcome to Phonebook!</p>");
});

// GET ALL PERSONS
app.get("/api/persons", (req, res, next) => {
  // res.status(200).json(persons);
  Person.find({})
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((error) => {
      next(error);
    });
});

// GET PERSON BY ID
app.get("/api/persons/:id", (req, res, next) => {
  const personId = req.params.id;

  Person.findById(personId)
    .then((person) => {
      if (!person) {
        res.status(404).json({
          httpStatus: 404,
          error: "Cannot find the requested person",
        });
      } else {
        res.status(200).json(person);
      }
    })
    .catch((error) => {
      next(error);
    });
});

//  GET INFO FOR PHONEBOOK
app.get("/api/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<p>Phonebook has info for ${count} people </p>
      <p>${new Date()}</p>`
      );
    })
    .catch((error) => {
      next(error);
    });
});

// CREATE NEW PERSON ENTRY
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.phoneNumber) {
    return res.status(400).json({
      httpStatus: 400,
      error: "Person name or phone number is missing",
    });
  }

  // create new person object
  const newPerson = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// UPDATE PERSON  by id
app.put("/api/persons/:id", (req, res, next) => {
  const personId = req.params.id;
  const updateData = req.body;

  if (!updateData.name || !updateData.phoneNumber) {
    return res.status(400).json({
      httpStatus: 400,
      error: "Person name or phone number is missing",
    });
  }

  Person.findByIdAndUpdate(personId, updateData, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).json({
          httpStatus: 404,
          error: "Person not found in database",
        });
      } else {
        res.status(200).json(updatedPerson);
      }
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE PERSON BY ID
app.delete("/api/persons/:id", (req, res, next) => {
  const personId = req.params.id;

  Person.findById(personId)
    .then((existingPerson) => {
      // if the person does not exist in database
      if (!existingPerson) {
        return res.status(404).json({
          httpStatus: 404,
          error: "Person not found in database",
        });
      } else {
        // if person exists in database
        Person.findByIdAndDelete(personId)
          .then((data) => {
            res.status(200).json({
              httpStatus: 200,
              message: "Deleted person from database",
            });
          })
          .catch((error) => {
            next(error);
          });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Middleware for handling unknown endpoints
const unknownEndpointHandler = (req, res) => {
  res.status(404).send({
    httpStatus: 404,
    error: "Unknown endpoint",
  });
};
app.use(unknownEndpointHandler);

// Error handler middleware
const errorHandler = (error, req, res, next) => {
  console.error(`ERROR: ${error.name}: ${error.message}`);

  if (error.name === "CastError") {
    return res.status(400).send({
      httpStatus: 400,
      error: "Malformatted ID",
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({
      httpStatus: 400,
      error: error.message,
    });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} since ${new Date()}`);
});
