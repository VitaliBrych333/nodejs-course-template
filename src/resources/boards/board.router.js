const router = require('express').Router();
const boardsService = require('./board.service');
const { ErrorHandler } = require('../../errorHandler');
const Board = require('./board.model');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();

    if (!boards.length) {
      throw new ErrorHandler(401, 'Access token is invalid');
    }

    res.json(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.getBoardById(req.params.id);

    if (!board) {
      throw new ErrorHandler(404, 'Board not found');
    }

    res.json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, 'Bad request');
    }

    const newBoard = await boardsService.createBoard(req.body);

    res.json(Board.toResponse(newBoard));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, 'Bad request');
    }

    const updBoard = await boardsService.updateBoard(req.params.id, req.body);

    if (!updBoard.n) {
      throw new ErrorHandler(404, 'Error, can not update the board');
    }

    const board = await boardsService.getBoardById(req.params.id);

    res.json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const delBoard = await boardsService.deleteBoard(req.params.id);

    if (!delBoard.deletedCount) {
      throw new ErrorHandler(404, 'Error, can not delete the board');
    }
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
