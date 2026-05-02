const Log = require("./logging_middleware/logger");

(async () => {
  await Log("backend", "info", "route", "test log working");
})();