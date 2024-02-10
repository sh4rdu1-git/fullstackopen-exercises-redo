const express = require("express");

const app = express();

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
  console.log(`${req.method} - ${req.url}`);
  res.status(200).json(persons);
});

// GET PERSON BY ID
app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const person = persons.find((p) => p.id === personId);
  if (!person) {
    return res.status(404).json({
      httpStatus: 404,
      message: "Cannot find the requested person",
    });
  }
  res.status(200).json(person);
});

//  GET INFO FOR PHONEBOOK
app.get("/api/info", (req, res) => {
  console.log(`${req.method} - ${req.url}`);
  const phonebookCount = persons.length;
  res.send(
    `<p>Phonebook has info for ${phonebookCount} people </p><p>${new Date()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
