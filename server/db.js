const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URI;

const connectToMongo = () => {
  try {
    mongoose.connect(mongoURL);
    console.log("Mongoose is connected");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(0);
  }
};

module.exports = connectToMongo;
