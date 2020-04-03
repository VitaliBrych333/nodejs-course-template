const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = params => boardsRepo.createBoard(params);
const updateBoard = (id, details) => boardsRepo.updateBoard(id, details);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
