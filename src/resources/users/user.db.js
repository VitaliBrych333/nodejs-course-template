const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getUserById = async id => {
  return User.findById(id);
};

const createUser = async user => {
  return User.create(user);
};

const updateUser = async (id, details) => {
  return User.updateOne({ _id: id }, details);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
