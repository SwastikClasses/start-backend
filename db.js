const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://swastik_pro:Swastik_2022@swastik-prod.akx8vhq.mongodb.net/universal";

const connectToMongo = async () => {
  await mongoose.connect(
    mongoURI,
    // { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );
};

module.exports = connectToMongo;
