# Vehicle Maintenance Scheduler

## Overview

This project implements a **Vehicle Maintenance Scheduler Microservice** that selects the optimal set of maintenance tasks for each depot using the **0/1 Knapsack Algorithm**, maximizing total impact within available mechanic hours.

---

## Features

- 🔹 Logging Middleware Integration (external logging API)
- 🔹 Optimized task selection using Dynamic Programming
- 🔹 External API integration for depots and vehicles
- 🔹 Clean modular backend structure

---

## Tech Stack

- Node.js
- Express.js
- Axios

---

## API Endpoint

### Get Optimized Schedule

```http
GET /api/schedule
```

**Response**

```json
[
  {
    "depotId": 1,
    "totalImpact": 140,
    "totalDuration": 60,
    "selectedTasks": [...]
  }
]
```

---

## Screenshots

### API Response

![API](screenshots/postman.png)

### Logs Output

![Logs](screenshots/terminal.png)

---

## Project Structure

```
RA2311033010004/
├── logging_middleware/
├── notification_app_be/
├── screenshots/
├── notification_system_design.md
├── README.md
```

---

## Approach

- Used **0/1 Knapsack Algorithm** to maximize impact
- Ensured total duration ≤ mechanic hours
- Applied solution for each depot independently

---

## Additional Work

- Designed **Campus Notification System** (Stage 1–6)
- Included system design covering APIs, DB design, scaling, and optimization

---

## Conclusion

- Efficient scheduling achieved
- Scalable backend design implemented
- Logging middleware integrated successfully

---
