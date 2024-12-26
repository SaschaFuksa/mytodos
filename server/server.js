const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Todo = sequelize.define('Todo', {
  text: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const todo = await Todo.create({ text: req.body.text });
  res.json(todo);
});

app.put('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.completed = req.body.completed;
  await todo.save();
  res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  await todo.destroy();
  res.json({ message: 'Todo deleted' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
