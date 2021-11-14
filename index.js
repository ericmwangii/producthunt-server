const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./api");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", api);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
