const express = require('express');
const sequelize = require('./utils/database');

const app = express();

sequelize
  .sync()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

app.get('/todos', todosController.getAllTodos);
app.get('/todos/:id', todosController.getTodoById);
app.post('/todos', todosController.createTodo);
app.put('/todos/:id', todosController.updateTodo);
app.delete('/todos/:id', todosController.deleteTodo);