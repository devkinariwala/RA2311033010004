const axios = require("axios");
const optimizeTasks = require("../services/schedulerService");
const Log = require("../../logging_middleware/logger");
exports.getSchedule = async (req, res) => {
  try {
    await Log("backend", "info", "controller", "Schedule API called");

    const token = process.env.TOKEN;

    const depotsRes = await axios.get(
      "http://20.207.122.201/evaluation-service/depots",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const vehiclesRes = await axios.get(
      "http://20.207.122.201/evaluation-service/vehicles",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    const result = [];

    for (const depot of depots) {
      await Log(
        "backend",
        "info",
        "controller",
        `Processing depot ${depot.ID}`,
      );

      const optimized = await optimizeTasks(vehicles, depot.MechanicHours);

      result.push({
        depotId: depot.ID,
        totalImpact: optimized.totalImpact,
        totalDuration: optimized.totalDuration,
        selectedTasks: optimized.selectedTasks,
      });
    }

    await Log("backend", "info", "controller", "Schedule generated");

    res.json(result);
  } catch (err) {
    console.error("FULL ERROR:", err); 

    await Log("backend", "error", "controller", err.message);

    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};
