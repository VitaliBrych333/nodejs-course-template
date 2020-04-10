const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../errorHandler');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();

    if (!users.length) {
      throw new ErrorHandler(401, 'Access token is invalid');
    }
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }

    res.json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, 'Bad request');
    }

    const newUser = await usersService.createUser(req.body);

    res.json(User.toResponse(newUser));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, 'Bad request');
    }

    const updUser = await usersService.updateUser(req.params.id, req.body);

    if (!updUser) {
      throw new ErrorHandler(404, 'Error, can not update the user');
    }

    res.json(User.toResponse(updUser));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const delUser = await usersService.deleteUser(req.params.id);

    if (!delUser) {
      throw new ErrorHandler(404, 'Error, can not delete the user');
    }

    res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
