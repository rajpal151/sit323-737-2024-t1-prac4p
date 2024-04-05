// index.js
const winston = require('winston');
const express = require('express');
const app = express();
const PORT = 3000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

app.use(express.json());

// Addition
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Addition operation requested: ${num1} + ${num2}`);
  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

// Subtraction
app.post('/subtract', (req, res) => {
  const { num1, num2 } = req.body;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Subtraction operation requested: ${num1} - ${num2}`);
  const result = parseFloat(num1) - parseFloat(num2);
  res.json({ result });
});

// Multiplication
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Multiplication operation requested: ${num1} * ${num2}`);
  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
});

// Division
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2) || parseFloat(num2) === 0) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Division operat
  ion requested: ${num1} / ${num2}`);
  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
});

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));

