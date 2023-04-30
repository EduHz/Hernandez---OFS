require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(morgan("tiny"));

// Definimos las rutas
app.get("/ruta", (req, res) => {
  res.send("<h2>Welcome to Kitoo pizza...</h2>");
});

app.get("/api/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/info", async (request, res) => {
  try {
    const people = await Person.find({});
    const count = people.length;
    res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/persons/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Utilizamos morgan como middleware
app.use(
  morgan((tokens, req, res) => {
    if (req.method === "POST") {
      return JSON.stringify(req.body);
    }
  })
);

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name,
    number,
  });

  try {
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
