const tasksRepo = require('./task.memory.repository');

const getAll = params => tasksRepo.getAll(params);
const getTaskById = params => tasksRepo.getTaskById(params);
const createTask = (params, details) => tasksRepo.createTask(params, details);
const updateTask = (params, details) => tasksRepo.updateTask(params, details);
const deleteTask = params => tasksRepo.deleteTask(params);

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
