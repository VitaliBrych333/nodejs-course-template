const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getBoardById = async id => {
  return Board.findById(id);
};

const createBoard = async details => {
  return Board.create(details);
};

const updateBoard = async (id, details) => {
  return Board.updateOne({ _id: id }, details);
};

const deleteBoard = async id => {
  return await Board.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
