import express from 'express';
// const fetch = require('node-fetch');
const app = express();
const port = 8000;

app.use(express.json());

app.post('/predict', async (req, res) => {
  try {
    const response = await fetch('https://sturgeon-light-especially.ngrok-free.app/predict/', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
