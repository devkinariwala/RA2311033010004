const Log = require("../../logging_middleware/logger");

const optimizeTasks = async (tasks, maxHours) => {
  await Log("backend", "info", "service", "Starting optimization");

  const n = tasks.length;
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(maxHours + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const { Duration, Impact } = tasks[i - 1];

    for (let w = 0; w <= maxHours; w++) {
      if (Duration <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          Impact + dp[i - 1][w - Duration]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  await Log("backend", "debug", "service", "DP table computed");
  let w = maxHours;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(tasks[i - 1]);
      w -= tasks[i - 1].Duration;
    }
  }
  selected.reverse();
  const totalImpact = selected.reduce((sum, t) => sum + t.Impact, 0);
  const totalDuration = selected.reduce((sum, t) => sum + t.Duration, 0);

  await Log(
    "backend",
    "info",
    "service",
    `Optimization done: Impact=${totalImpact}, Duration=${totalDuration}`
  );

  return {
    selectedTasks: selected,
    totalImpact,
    totalDuration
  };
};

module.exports = optimizeTasks;