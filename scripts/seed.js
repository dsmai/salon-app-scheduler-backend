const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { SalonService } = require("../model/model");

dotenv.config();

const seedServices = [
  {
    name: "European Spa Pedicure",
    duration: "1 hr",
    price: 50,
  },
  {
    name: "Luxury Spa Pedicure",
    duration: "2 hr",
    price: 60,
  },
  {
    name: "Asian Spa Manicure",
    duration: "40 mins",
    price: 20,
  },
  {
    name: "Canadian Spa Pedicure",
    duration: "30 mins",
    price: 40,
  },
];

const seedDatabase = async () => {
  try {
    // CONNECT DATABASE
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Connected to MongoDB from seed script"));

    // Clear the existing data
    await SalonService.deleteMany();

    // Insert seed data
    await SalonService.insertMany(seedServices);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding the database: ", err);
    process.exit(1);
  }
};

seedDatabase();
