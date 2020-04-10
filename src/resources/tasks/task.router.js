const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { ErrorHandler } = require('../../errorHandler');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getTasksByBoard(req.params);

    if (!tasks.length) {
      throw new ErrorHandler(401, 'Access token is invalid');
    }

    res.json(tasks);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const taskById = await tasksService.getTaskById(req.params);

    if (!taskById) {
      throw new ErrorHandler(404, 'Task not found');
    }

    res.json(taskById);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, 'Bad request');
    }

    const newTask = await tasksService.createTask(req.params, req.body);

    res.json(newTask);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, 'Bad request');
    }

    const updTask = await tasksService.updateTask(req.params, req.body);

    if (!updTask) {
      throw new ErrorHandler(404, 'Error, can not update the task');
    }

    res.json(updTask);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const delTask = await tasksService.deleteTask(req.params);

    if (!delTask) {
      throw new ErrorHandler(404, 'Error, can not delete the task');
    }

    res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
