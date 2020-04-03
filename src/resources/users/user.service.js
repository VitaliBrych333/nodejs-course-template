const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const createUser = params => usersRepo.createUser(params);
const updateUser = (id, details) => usersRepo.updateUser(id, details);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
