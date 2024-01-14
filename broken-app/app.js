const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/', async (req, res, next) => {
  try {
    const developers = req.body.developers;
    
    if (!developers || !Array.isArray(developers) || developers.length === 0) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of developers.' });
    }

    const results = await Promise.all(developers.map(async d => {
      const response = await axios.get(`https://api.github.com/users/${d}`);
      return response.data;
    }));

    const out = results.map(r => ({ name: r.name, bio: r.bio }));

    return res.json(out);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

