const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params);

  if (tasks.length) {
    res.json(tasks);
  } else {
    res.status(401).end();
  }
});

router.route('/:id').get(async (req, res) => {
  const taskById = await tasksService.getTaskById(req.params);

  if (taskById) {
    res.json(taskById);
  } else {
    res.status(404).end();
  }
});

router.route('/').post(async (req, res) => {
  const newTask = await tasksService.createTask(req.params, req.body);

  res.json(newTask);
});

router.route('/:id').put(async (req, res) => {
  const updTask = await tasksService.updateTask(req.params, req.body);

  if (updTask) {
    res.json(updTask);
  } else {
    res.status(404).end();
  }
});

router.route('/:id').delete(async (req, res) => {
  const delTask = await tasksService.deleteTask(req.params);

  if (delTask) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
