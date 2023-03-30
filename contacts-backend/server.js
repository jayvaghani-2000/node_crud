const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const validateToken = require("./middleware/validateTokenHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./Routes/contactRoute"));
app.use("/api/users", require("./Routes/users"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
