const express = require('express');
const asyncHandler = require('../handleMidleware/utils');
const path = require('path');
const uuid = require('uuid');
const router = new express.Router();

const fs = require('fs');

const boards = require('../db/boards.json');

router.get(
  '/boards',
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res) => {
    res.json(boards);
    res.end();
  })
);

router.get(
  '/boards/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const boardById = boards.boards.find(item => item.id === id);

    if (boardById) {
      res.json(boardById);
      res.end();
    } else {
      throw new Error('Not found!');
    }
  })
);

router.post(
  '/boards',
  asyncHandler(async (req, res) => {
    const content = req.body;

    // eslint-disable-next-line no-prototype-builtins
    if (content.hasOwnProperty('title') && content.hasOwnProperty('columns')) {
      content.id = uuid();
      boards.boards.push(content);

      fs.writeFile(
        path.join(__dirname, '../db/boards.json'),
        JSON.stringify(boards, 0, 2),
        'utf8',
        err => {
          if (err) {
            throw new Error('Can not write!');
          }
          res.end();
        }
      );
    } else {
      throw new Error('Missed properties!');
    }
  })
);

router.put(
  '/boards/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const content = req.body;
    const index = boards.boards.findIndex(item => item.id === id);

    if (index) {
      // add checking on valid
      boards.boards[index].title = content.title;
      boards.boards[index].columns = content.columns;

      fs.writeFile(
        path.join(__dirname, '../db/boards.json'),
        JSON.stringify(boards, 0, 2),
        'utf8',
        err => {
          if (err) {
            throw new Error('Can not update!');
          }
          res.json(boards);
          res.end();
        }
      );
    } else {
      throw new Error('Not found!');
    }
  })
);

router.delete(
  '/boards/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    boards.boards = boards.boards.filter(item => item.id !== id);

    fs.writeFile(
      path.join(__dirname, '../db/boards.json'),
      JSON.stringify(boards, 0, 2),
      'utf8',
      err => {
        if (err) {
          throw new Error('Can not update!');
        }
        res.json(boards);
        res.end();
      }
    );
  })
);

module.exports = router;
