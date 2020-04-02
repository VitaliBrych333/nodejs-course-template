/* eslint-disable no-prototype-builtins */
const express = require('express');
const asyncHandler = require('../handleMidleware/utils');
const path = require('path');
const uuid = require('uuid');
const router = new express.Router();

const fs = require('fs');

const users = require('../db/users.json');

router.get(
  '/users',
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res) => {
    const response = [];
    users.users.forEach(item => {
      const newUser = {
        id: item.id,
        name: item.name,
        login: item.login
      };
      response.push(newUser);
    });
    res.json(response);
    res.end();
  })
);

router.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userById = users.users.find(item => item.id === id);

    if (userById) {
      const newUserById = {
        id: userById.id,
        name: userById.name,
        login: userById.login
      };
      res.json(newUserById);
      res.end();
    } else {
      throw new Error('Not found!');
    }
  })
);

router.post(
  '/users',
  asyncHandler(async (req, res) => {
    const content = req.body;

    // eslint-disable-next-line no-prototype-builtins
    if (
      content.hasOwnProperty('name') &&
      content.hasOwnProperty('login') &&
      content.hasOwnProperty('passord')
    ) {
      content.id = uuid();
      users.users.push(content);

      fs.writeFile(
        path.join(__dirname, '../db/users.json'),
        JSON.stringify(users, 0, 2),
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
  '/users/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const content = req.body;
    const index = users.users.findIndex(item => item.id === id);

    if (index) {
      // add checking on valid
      users.users[index].name = content.name;
      users.users[index].login = content.login;
      users.users[index].password = content.password;

      fs.writeFile(
        path.join(__dirname, '../db/users.json'),
        JSON.stringify(users, 0, 2),
        'utf8',
        err => {
          if (err) {
            throw new Error('Can not update!');
          }
          res.json(users);
          res.end();
        }
      );
    } else {
      throw new Error('Not found!');
    }
  })
);

router.delete(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    users.users = users.users.filter(item => item.id !== id);

    fs.writeFile(
      path.join(__dirname, '../db/users.json'),
      JSON.stringify(users, 0, 2),
      'utf8',
      err => {
        if (err) {
          throw new Error('Can not update!');
        }
        res.json(users);
        res.end();
      }
    );
  })
);

module.exports = router;
