const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json({ extended: true }));

app.use(cors());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

const PORT = process.env.PORT || 5000;
async function start() {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
