const User = require('./user.model');

const users = [
  {
    id: '1001',
    name: 'Ines',
    login: 'Warner',
    password: 'ea'
  },
  {
    id: '1002',
    name: 'Brock',
    login: 'Morales',
    password: 'tritp'
  },
  {
    id: '1003',
    name: 'Inyty',
    login: 'Watytyty',
    password: 'eartrtr'
  },
  {
    id: '1004',
    name: 'Inqwqw',
    login: 'Wawqwq',
    password: 'e3434'
  },
  {
    id: '1005',
    name: 'Irrrr',
    login: 'Warr',
    password: 'e1212'
  }
];

const getAll = async () => {
  return users;
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async params => {
  const { name, login, password } = params;
  const newUser = new User({ name, login, password });

  users.push(newUser);

  return newUser;
};

const updateUser = async (id, details) => {
  const user = users.find(item => item.id === id);

  Object.assign(user, details);

  return user;
};

const deleteUser = async id => {
  const ind = users.findIndex(user => user.id === id);

  if (ind !== -1) {
    users.splice(ind, 1);
    return true;
  }

  return false;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
