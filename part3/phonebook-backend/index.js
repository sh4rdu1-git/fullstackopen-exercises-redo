const express = require("express");
const morgan = require("morgan");

const app = express();

const generateId = () => {
  return Math.floor(Math.random() * 99999);
};

// Use the morgan logger middleware with "tiny" format
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// LANDING PAGE / ROOT PATH
app.get("/", (req, res) => {
  res.send("<p>Welcome to Phonebook!</p>");
});

// GET ALL PERSONS
app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

// GET PERSON BY ID
app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const person = persons.find((p) => p.id === personId);
  if (!person) {
    return res.status(404).json({
      httpStatus: 404,
      error: "Cannot find the requested person",
    });
  }
  res.status(200).json(person);
});

//  GET INFO FOR PHONEBOOK
app.get("/api/info", (req, res) => {
  const phonebookCount = persons.length;
  res.send(
    `<p>Phonebook has info for ${phonebookCount} people </p><p>${new Date()}</p>`
  );
});

// Should use express.json() middleware to read JSON data from request body
app.use(express.json());

// CREATE NEW PERSON ENTRY
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      httpStatus: 400,
      error: "Person name is missing",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      httpStatus: 400,
      error: "Phone number is missing",
    });
  }

  const isNewPerson = persons.find((p) => p.name === body.name) ? false : true;
  if (!isNewPerson) {
    return res.status(400).json({
      httpStatus: 400,
      error: "Person name must be unique",
    });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons.push(newPerson);
  res.status(201).json(newPerson);
});

// DELETE PERSON BY ID
app.delete("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const personIndex = persons.findIndex((p) => p.id === personId);
  if (personIndex === -1) {
    return res.status(404).json({
      httpStatus: 404,
      error: "Person not found in database",
    });
  }
  persons.splice(personIndex, 1);
  res.status(200).json({
    httpStatus: 200,
    message: "Deleted person from database",
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} since ${new Date()}`);
});
