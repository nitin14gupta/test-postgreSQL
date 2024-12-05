const express = require('express');
const { createTables, insertUser, getUsers } = require('./queries');

const app = express();
const PORT = 3000;

app.use(express.json());

// Create tables on startup
createTables();

// Routes
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await insertUser(name, email);
  res.json(user);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
