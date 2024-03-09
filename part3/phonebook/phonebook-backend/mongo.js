const mongoose = require("mongoose");

// EXAMPLE COMMAND OF HOW THIS PROGRAM WILL RUN
// 		node mongo.js yourpassword Anna 040-1234556
// argv[ 0		1			2		3		4]

const password = process.argv[2];

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const dbURL = `mongodb+srv://fullstack-user:${password}@fsoexercisesdb.vahc40i.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fsoExercisesDB`;

mongoose.set("strictQuery", false);
mongoose.connect(dbURL);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});
const Person = mongoose.model("Person", personSchema);

if (!(process.argv[3] && process.argv[4])) {
  // IF no arguments given for name and phone number, then print all persons details
  Person.find({}).then((persons) => {
    console.log("Phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.phoneNumber}`);
    });

    mongoose.connection.close();
  });
} else {
  // Else create a new person contact and save to DB
  const newName = process.argv[3];
  const newPhoneNumber = process.argv[4];

  const person = new Person({
    name: newName,
    phoneNumber: newPhoneNumber,
  });

  person.save().then((result) => {
    console.log(`Added ${newName} number ${newPhoneNumber} to phonebook`);

    mongoose.connection.close();
  });
}
