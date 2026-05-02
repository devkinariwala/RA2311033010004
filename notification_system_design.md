# Campus Notification System Design

---

## Stage 1: API Design

### 1. Get Notifications

```http
GET /notifications?studentId=123
```

**Response**

```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "Placement",
      "message": "TCS Hiring",
      "isRead": false,
      "createdAt": "2026-04-22T17:51:30Z"
    }
  ]
}
```

---

### 2. Create Notification

```http
POST /notifications
```

```json
{
  "studentId": 123,
  "type": "Event",
  "message": "Tech Fest"
}
```

---

### 3. Mark as Read

```http
PUT /notifications/read
```

```json
{
  "notificationId": "uuid"
}
```

---

### 4. Real-time Updates

- Use WebSockets / SSE for instant delivery

---

## Stage 2: Database Design

**Choice:** PostgreSQL (structured + indexing support)

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  studentId INT,
  type VARCHAR(20),
  message TEXT,
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Stage 3: Query Optimization

**Problem Query**

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```

**Fix (Index)**

```sql
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt DESC);
```

**Improvement**

- Faster lookup (O(log N))
- Add pagination:

```sql
LIMIT 20 OFFSET 0;
```

---

## Stage 4: Performance Improvements

**Issues**

- DB overload due to frequent fetch

**Solutions**

- Redis caching (reduce DB calls)
- Pagination (limit results)
- Lazy loading
- WebSockets instead of polling

---

## Stage 5: Notify All Optimization

**Problem**

- Sequential processing (slow, failure-prone)

**Solution**

- Use Queue (Kafka/RabbitMQ)

```text
Producer → Queue → Worker → (Email + DB + Push)
```

**Benefits**

- Retry mechanism
- Fault tolerance
- Scalable

---

## Stage 6: Priority Inbox

**Goal:** Show top 10 important notifications

**Scoring Logic**

```text
Score = TypeWeight + Recency
```

**Weights**

- Placement = 10
- Result = 8
- Event = 5

**Approach**

- Sort by score
- Return top 10
- Use Min Heap for efficiency

---

## Conclusion

- Designed scalable APIs
- Optimized DB queries using indexing
- Improved performance via caching & queues
- Built reliable notification delivery system
- Implemented priority-based notification ranking

---
