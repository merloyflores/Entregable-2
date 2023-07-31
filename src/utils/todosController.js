// utils/todosController.js
const Todo = require('../models/Todo');

// Obtener todas las tareas
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Obtener una tarea por su id
exports.getTodoById = async (req, res, next) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva tarea
exports.createTodo = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const newTodo = await Todo.create({ title, description });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// Actualizar una tarea
exports.updateTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const { title, description, completed } = req.body;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Eliminar una tarea
exports.deleteTodo = async (req, res, next) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    await todo.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};