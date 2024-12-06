const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
// CONNECT DATABASE
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(express.json());
app.use(morgan("common"));

let services = [
  {
    id: 1,
    name: "European Spa Pedicure",
    duration: "1 hr",
    price: 50,
  },
  {
    id: 2,
    name: "Luxury Spa Pedicure",
    duration: "2 hr",
    price: 60,
  },
  {
    id: 3,
    name: "Asian Spa Manicure",
    duration: "40 mins",
    price: 20,
  },
  {
    id: 4,
    name: "Madagasca Spa Pedicure",
    duration: "30 mins",
    price: 40,
  },
];

let orders = [
  {
    user: "Son Mai",
    total: 100,
  },
];

// Middleware: functions that could be used to handle request and response objects
const requestLogger = (req, res, next) => {
  console.log("---");
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---");
  next();
};

app.use(requestLogger);

// Define 2 simple routes
// simple RESTful HTTP API end points
// app.get("/", (req, res) => {
//   res.send("<h1>Hello Miu</h1>");
// });

// app.get("/api", (req, res) => {
//   res.status(200).json("Hello Miu Miu Miu");
// });

// app.get("/miu/happy", (req, res) => {
//   res.send("Miu is happy!");
// });

// GET all services
app.get("/api/services", (req, res) => {
  res.json(services);
});

// GET specfic service
app.get("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);
  const service = services.find((service) => service.id === id);

  // handle service if found/not found
  if (service) {
    res.json(service);
  } else {
    res.status(404).end();
  }
});

// DELETE all resources
app.delete("/api/services", (req, res) => {
  services = [];
  res.status(204).end();
});

// DELETE a specific resource
app.delete("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);
  services = services.filter((service) => service.id !== id);
  res.status(204).end();
});

// POST a total cost when checkout
app.post("/api/checkout", (req, res) => {
  const order = req.body;
  console.log(order);
  // Save new order to database
  orders.push(order);
  // Respond back to the client with the orders array
  res.json(orders);
});

// POST a service API endpoint
app.post("/api/services", (req, res) => {
  // Step 1: create a new id for the new service (coming from client)
  const id = services[services.length - 1].id + 1;

  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      error: "name or price missing",
    });
  }
  // Step 2: create a newService object that has this new id
  const newService = { ...req.body, id };
  // Step 3: push this newService object to the services array
  services.push(newService);
  res.json(services);
});

// PUT API endpoint

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
