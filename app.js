const connectToMongo = require("./db.js");
require("dotenv").config();
const express = require("express");
var cors = require("cors");

const app = express();
const port = 4000;

connectToMongo();

app.use(cors());
app.use(express.json());
express.urlencoded({ extended: false });

//Available Routes
app.use("/start-backend/api", require("./routes/auth"));
app.use("/start-backend/otp", require("./routes/otp"));
app.use("/start-backend/paytm", require("./routes/paytm"));
app.use("/start-backend/easebuzz", require("./routes/easebuzz"));
app.use("/start-backend/thinkexam", require("./routes/thinkExam"));

app.get("/start-backend", (req, res) => {
  res.send({
    status: 200,
    data: {
      message: "Vohooo! Working!",
    },
  });
});

app.listen();
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
