const express = require("express");
const app = express();
const fs = require('fs');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Basic Operations
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => {
    if (n2 === 0) {
        logger.error("Cannot divide by zero");
        throw new Error("Cannot divide by zero");
    }
    return n1 / n2;
};

// Advanced Operations
const power = (n1, n2) => Math.pow(n1, n2);
const modulo = (n1, n2) => n1 % n2;
const sqrt = (n1) => {
    if (n1 < 0) {
        logger.error("Cannot take square root of negative number");
        throw new Error("Cannot take square root of negative number");
    }
    return Math.sqrt(n1);
};

// Generic handler for 2-input operations
const handleOperation = (req, res, operation, operationName) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ${n1} and ${n2} received for ${operationName}');
        const result = operation(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error('${operationName} error: ${error.message}');
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
};

// Handler for 1-input operations like square root
const handleOneInputOperation = (req, res, operation, operationName) => {
    try {
        const n1 = parseFloat(req.query.n1);

        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }

        logger.info('Parameter ${n1} received for ${operationName}');
        const result = operation(n1);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error('${operationName} error: ${error.message}');
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
};

// Routes
app.get("/add", (req, res) => handleOperation(req, res, add, "addition"));
app.get("/subtract", (req, res) => handleOperation(req, res, subtract, "subtraction"));
app.get("/multiply", (req, res) => handleOperation(req, res, multiply, "multiplication"));
app.get("/divide", (req, res) => handleOperation(req, res, divide, "division"));

app.get("/power", (req, res) => handleOperation(req, res, power, "power"));
app.get("/modulo", (req, res) => handleOperation(req, res, modulo, "modulo"));
app.get("/sqrt", (req, res) => handleOneInputOperation(req, res, sqrt, "square root"));

const port = 3040;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});