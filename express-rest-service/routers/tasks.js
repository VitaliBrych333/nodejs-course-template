/* eslint-disable no-prototype-builtins */
const express = require('express');
const asyncHandler = require('../handleMidleware/utils');
const path = require('path');
const uuid = require('uuid');
const router = new express.Router();

const fs = require('fs');

const tasks = require('../db/tasks.json');

router.get(
  '/tasks',
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    let allTasks = tasks.tasks;
    if (id) {
      allTasks = tasks.tasks.filter(item => item.boardId === id);
    }
    res.json(allTasks);
    res.end();
  })
);

router.get(
  '/tasks/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const taskById = tasks.tasks.find(item => item.id === id);

    if (taskById) {
      res.json(taskById);
      res.end();
    } else {
      throw new Error('Not found!');
    }
  })
);

router.post(
  '/tasks',
  asyncHandler(async (req, res) => {
    const content = req.body;

    if (
      content.hasOwnProperty('title') &&
      content.hasOwnProperty('order') &&
      content.hasOwnProperty('description')
    ) {
      content.id = uuid();
      content.userId = uuid();
      content.boardId = uuid();
      content.columnId = uuid();

      tasks.tasks.push(content);

      fs.writeFile(
        path.join(__dirname, '../db/tasks.json'),
        JSON.stringify(tasks, 0, 2),
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
  '/tasks/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const content = req.body;
    const index = tasks.tasks.findIndex(item => item.id === id);

    if (index) {
      // add checking on valid
      tasks.tasks[index].title = content.title;
      tasks.tasks[index].order = content.order;
      tasks.tasks[index].description = content.description;
      tasks.tasks[index].userId = content.userId;
      tasks.tasks[index].boardId = content.boardId;
      tasks.tasks[index].columnId = content.columnId;

      fs.writeFile(
        path.join(__dirname, '../db/tasks.json'),
        JSON.stringify(tasks, 0, 2),
        'utf8',
        err => {
          if (err) {
            throw new Error('Can not update!');
          }
          res.json(tasks);
          res.end();
        }
      );
    } else {
      throw new Error('Not found!');
    }
  })
);

router.delete(
  '/tasks/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    tasks.tasks = tasks.tasks.filter(item => item.id !== id);

    fs.writeFile(
      path.join(__dirname, '../db/tasks.json'),
      JSON.stringify(tasks, 0, 2),
      'utf8',
      err => {
        if (err) {
          throw new Error('Can not update!');
        }
        res.json(tasks);
        res.end();
      }
    );
  })
);

module.exports = router;
