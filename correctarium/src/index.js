const express = require('express');

const { calculatePrice } = require('./functions/calculatePrice');
const { calculateWorkingMinutes } = require('./functions/calculateWorkingMinutes');
const { addMinutesToWorkingTime } = require('./functions/addMinutesToWorkingTime');

const app = express();

const PORT = 3000;

app.get('/estimate', (req, res) => {
  const { language, mimetype, count } = req.query;

  if (!language || !mimetype || !count) {
    res.status(400).send('Invalid params provided. Expected language, mimetype, count');

    return;
  }

  if (!['ru', 'ua', 'en'].some((languageLocal) => languageLocal === language)) {
    res.status(400).send('Invalid language param provided. Expected ru, ua, en');

    return;
  }

  if (parseInt(count, 10) === NaN) {
    res.status(400).send('Count should be a number');

    return;
  }

  const currentDate = new Date();

  const workingMinutes = calculateWorkingMinutes(language, count, mimetype);
  const deadline = addMinutesToWorkingTime(currentDate, workingMinutes);

  const response = {
    price: calculatePrice(language, count, mimetype),
    time: Math.floor(workingMinutes / 60 * 10) / 10,
    deadline: Math.floor(Number(deadline) / 1000),
    deadline_date: deadline.toLocaleString(),
  };

  res.status(200).send(response);
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
