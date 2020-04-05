const Task = require('./task.model');

const tasks = [
  {
    id: '4001',
    title: 'Task1',
    order: '1',
    description: 'Description1',
    userId: '1001',
    boardId: '2001',
    columnId: '3001'
  },
  {
    id: '4002',
    title: 'Task2',
    order: '2',
    description: 'Description2',
    userId: '1002',
    boardId: '2002',
    columnId: '3002'
  },
  {
    id: '4003',
    title: 'Task3',
    order: '3',
    description: 'Description3',
    userId: '1003',
    boardId: '2003',
    columnId: '3003'
  },
  {
    id: '4004',
    title: 'Task4',
    order: '4',
    description: 'Description4',
    userId: '1004',
    boardId: '2004',
    columnId: '3004'
  },
  {
    id: '4005',
    title: 'Task5',
    order: '5',
    description: 'Description5',
    userId: '1005',
    boardId: '2005',
    columnId: '3005'
  }
];

const getAll = async () => {
  return tasks;
};

const getTaskById = async params => {
  return tasks.find(item => item.id === params.id);
};

const getTasksByBoard = async params => {
  return tasks.filter(item => item.boardId === (params.boardId || params));
};

const createTask = async (params, details) => {
  const { title, order, description, userId, columnId } = details;
  const boardId = params.boardId;

  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });

  tasks.push(newTask);

  return newTask;
};

const updateTask = async (params, details) => {
  const task = tasks.find(item => item.id === params.id);

  if (task) {
    Object.assign(task, details);

    return task;
  }

  return false;
};

const deleteTask = async params => {
  const index = tasks.findIndex(item => item.id === params.id);

  if (index !== -1) {
    tasks.splice(index, 1);

    return true;
  }

  return false;
};

module.exports = {
  getAll,
  getTaskById,
  getTasksByBoard,
  createTask,
  updateTask,
  deleteTask
};
