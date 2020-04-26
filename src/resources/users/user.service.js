const bcrypt = require('bcrypt');
const usersRepo = require('./user.db');
const tasksService = require('../tasks/task.service');
const saltRounds = 10;

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const createUser = async params => {
  const encrypPassword = await bcrypt.hash(params.password, saltRounds);
  Object.assign(params, { password: encrypPassword });

  return usersRepo.createUser(params);
};
const updateUser = (id, details) => usersRepo.updateUser(id, details);
const deleteUser = async id => {
  const delUser = await usersRepo.deleteUser(id);

  if (delUser) {
    const allTasks = await tasksService.getAll();

    await Promise.all(
      allTasks
        .filter(item => item.userId === id)
        .map(item => {
          return tasksService.updateTask({ id: item.id }, { userId: null });
        })
    );
  }

  return delUser;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
