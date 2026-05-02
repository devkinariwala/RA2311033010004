const express = require("express");
const Log = require("../logging_middleware/logger");
const schedulerRoutes = require("./routes/schedulerRoute");


const app = express();
app.use(express.json());
app.use("/api", schedulerRoutes);

app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Root API hit");
  res.send("Server running");
});

app.listen(3000, async () => {
  await Log("backend", "info", "route", "Server started");
  console.log("Server running on port 3000");
});