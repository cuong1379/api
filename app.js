require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5555;
const authenticate = require("./middleweres/verifyToken");
var cors = require("cors");

app.use(cors());

const connectDB = require("./config/db");

connectDB();

app.use(express.json());

const productions = require("./routes/productions");
const customers = require("./routes/customers");
const users = require("./routes/users");

app.use("/productions", productions);
app.use("/customers", customers);
app.use("/users", users);
app.use("/", (req, res) => res.json({ message: "Chao Cuong" }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
