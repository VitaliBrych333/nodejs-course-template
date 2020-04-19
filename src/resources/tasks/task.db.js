const Task = require('./task.model');

const getAll = async () => {
  return Task.find({});
};

const getTasksByBoard = async params => {
  return await Task.find({ boardId: params.boardId });
};

const getTaskById = async params => {
  return Task.findById(params.id);
};

const createTask = async (params, details) => {
  const { title, order, description, userId, columnId } = details;
  const boardId = params.boardId;

  return Task.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
};

const updateTask = async (params, details) => {
  return Task.updateOne({ _id: params.id }, details);
};

const deleteTask = async params => {
  return (await Task.deleteOne({ _id: params.id })).deletedCount;
};

module.exports = {
  getAll,
  getTasksByBoard,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
