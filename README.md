# SIT737-2025-Prac4C: Enhanced Calculator Microservice

This repository contains the updated **Calculator Microservice** for SIT737 Practical 4.2C at Deakin University.

In this version, I ahve extended the microservice with **advanced arithmetic operations** and **improved error handling**, using **Node.js**, **Express**, and **Winston** for logging.

---

## ✨ Features

- ✅ Basic arithmetic: `add`, `subtract`, `multiply`, `divide`
- ✅ Advanced operations: `power`, `sqrt`, `modulo`
- ✅ RESTful API using Express
---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A code editor (e.g. [VS Code](https://code.visualstudio.com/))

---

### 🛠️ Setup

1. **Clone this repo:**
   ```bash
   git clone https://github.com/AdeelAhmedIqbal/sit737-2025-prac4c.git
   cd sit737-2025-prac4c
   ```

2. **Install dependencies:**
   ```bash
   npm install express winston
   ```

3. **Run the microservice:**
   ```bash
   node mycal.js
   ```

   Microservice will run on: `http://localhost:3040`

---

## 📡 API Endpoints

> All endpoints return a JSON response with `statuscode` and `data`.

### 🔢 Basic Operations

| Operation      | Endpoint       | Example                        |
|----------------|----------------|--------------------------------|
| Add            | `/add`         | `/add?n1=5&n2=3`               |
| Subtract       | `/subtract`    | `/subtract?n1=10&n2=4`         |
| Multiply       | `/multiply`    | `/multiply?n1=6&n2=7`          |
| Divide         | `/divide`      | `/divide?n1=15&n2=3`           |

### 🧠 Advanced Operations

| Operation         | Endpoint      | Example                          |
|------------------|---------------|----------------------------------|
| Exponentiation    | `/power`      | `/power?n1=2&n2=4` → 16          |
| Square Root       | `/sqrt`       | `/sqrt?n1=9` → 3                 |
| Modulo            | `/modulo`     | `/modulo?n1=10&n2=3` → 1         |

---

## ⚠️ Error Handling

- Invalid or missing inputs → `500` status
- Division by zero → handled with error log
- Negative square root → custom error response
- Errors logged using **Winston**

---

## 📁 Logging

Using [Winston](https://github.com/winstonjs/winston):

| Log Type     | File            | Description                        |
|--------------|------------------|------------------------------------|
| Errors only  | `error.log`      | Errors like invalid input, exceptions |
| All logs     | `combined.log`   | Includes info + error logs          |

## 👨‍💻 Author

**Adeel Ahmed Iqbal**  
**Student ID: 224404186**  
GitHub: [@AdeelAhmedIqbal](https://github.com/AdeelAhmedIqbal)

---
