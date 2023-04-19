const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors())

// Hardcode de array persons
let persons = [
  { id: 1, name: "Arto Hellas", number: "040,123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", number: "39-23-6423122" },
];

// Definimos las rutas
app.get("/", (req, res) => {
  res.send("<h2>Welcome to Phonebook...</h2>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const infoPersons = persons.length;
  res.send(
    `<div>Phonebook has info for ${infoPersons} people \n ${date}</div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const foundPerson = persons.find((person) => person.id === id);
  if (!foundPerson) {
    res.status(404).end();
  }
  res.json(foundPerson);
});

// Utilizamos morgan como middleware

app.use(morgan("tiny")); //tiny , mantiene un registro red

app.use(
  morgan((tokens, req, res) => {
    if (req.method === "POST") {
      return JSON.stringify(req.body);
    }
  })
);

// METODOS

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.use(express.json()); //Es para definir la propiedad body

function generateId() {
  let maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
}

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "number or name missing",
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
})