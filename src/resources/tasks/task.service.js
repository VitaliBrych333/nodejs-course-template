const tasksRepo = require('./task.db');

const getAll = () => tasksRepo.getAll();
const getTaskById = params => tasksRepo.getTaskById(params);
const getTasksByBoard = params => tasksRepo.getTasksByBoard(params);
const createTask = (params, details) => tasksRepo.createTask(params, details);
const updateTask = (params, details) => tasksRepo.updateTask(params, details);
const deleteTask = params => tasksRepo.deleteTask(params);

module.exports = {
  getAll,
  getTaskById,
  getTasksByBoard,
  createTask,
  updateTask,
  deleteTask
};
