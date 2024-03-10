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
app.get("/api/persons", (req, res) => {
  // res.status(200).json(persons);
  Person.find({})
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((error) => {
      console.error(
        `Error while getting data for all people from database: ${error.message}`
      );
      res.status(500).json({
        httpStatus: 500,
        error: "Internal server error",
      });
    });
});

// GET PERSON BY ID
app.get("/api/persons/:id", (req, res) => {
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
      console.error(
        `Error while finding person by id from database: ${error.message}`
      );
      res.status(500).json({
        httpStatus: 500,
        error: "Internal server error",
      });
    });
});

//  GET INFO FOR PHONEBOOK
app.get("/api/info", (req, res) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<p>Phonebook has info for ${count} people </p>
      <p>${new Date()}</p>`
      );
    })
    .catch((error) => {
      console.error(
        `Error while counting number of people in phonebook from database: ${error.message}`
      );
      res.status(500).json({
        httpStatus: 500,
        error: "Internal server error",
      });
    });
});

// CREATE NEW PERSON ENTRY
app.post("/api/persons", (req, res) => {
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
      console.error(`Error while saving person to database: ${error.message}`);
      res.status(500).json({
        httpStatus: 500,
        error: "Internal server error",
      });
    });
});

// UPDATE PERSON  by id
app.put("/api/persons/:id", (req, res) => {
  const personId = req.params.id;
  const updateData = req.body;

  Person.findByIdAndUpdate(personId, updateData, { new: true })
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
      console.error(
        `Error while updating person in database: ${error.message}`
      );
      res.status(500).json({
        httpStatus: 500,
        error: "Internal server error",
      });
    });
});

// DELETE PERSON BY ID
app.delete("/api/persons/:id", (req, res) => {
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
            console.error(
              `Error while deleting person from database: ${error.message}`
            );
            res.status(500).json({
              httpStatus: 500,
              error: "Internal server error",
            });
          });
      }
    })
    .catch((error) => {
      console.error(
        `Error while cbecking person existence in database: ${error.message}`
      );
      res.status(500).json({
        httpStatus: 500,
        error: "Internal server error",
      });
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} since ${new Date()}`);
});
