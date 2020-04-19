const boardsRepo = require('./board.db');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = params => boardsRepo.createBoard(params);
const updateBoard = (id, details) => boardsRepo.updateBoard(id, details);
const deleteBoard = async id => {
  const delBoard = await boardsRepo.deleteBoard(id);

  if (delBoard) {
    const tasksByBoard = await tasksService.getTasksByBoard({ boardId: id });

    if (tasksByBoard) {
      await Promise.all(
        tasksByBoard.map(item => tasksService.deleteTask({ id: item.id }))
      );
    }
  }

  return delBoard;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
