const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const createUser = params => usersRepo.createUser(params);
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
