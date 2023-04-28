require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.static("build"));

// Definimos las rutas
app.get("/ruta", (req, res) => {
  res.send("<h2>Welcome to Kitoo pizza...</h2>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  Person.countDocuments({}, (err, count) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const date = new Date();
      res.send(
        `<div>Phonebook has info for ${count} people \n ${date}</div>`
      );
    }
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// Utilizamos morgan como middleware
app.use(morgan("tiny"));
app.use(
  morgan((tokens, req, res) => {
    if (req.method === "POST") {
      return JSON.stringify(req.body);
    }
  })
);

app.use(express.json());

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

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error.message });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
