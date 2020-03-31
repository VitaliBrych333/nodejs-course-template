const express = require('express');
const asyncHandler = require('../handleMidleware/utils');
// const newsModel = require('../models/news-model');
const router = new express.Router();

// const fs = require('fs');

const boards = require('../db/boards.json');

// const auth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.send('YOU not autorized');
//     res.end();
//   }
// };

// router.get(
//   '/logout',
//   asyncHandler(async (req, res, next) => {
//     req.logout();
//     req.session.destroy(() => {
//       res.redirect('/authorization');
//     });
//   })
// );

router.get(
  '/boards',
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    // const news = await newsModel.find({}).exec();
    res.json(boards);
    res.end();
  })
);

// router.get(
//   '/boards/:id',
//   asyncHandler(async (req, res, next) => {
//     const id = req.params.id;

//     // const news = await newsModel.findById(id).exec();
//     if (news) {
//       res.json(news);
//       res.end();
//     } else {
//       throw new Error('Not found!');
//     }
//   })
// );

// router.post(
//   '/boards',
//   asyncHandler(async (req, res, next) => {
//     // const content = req.body;

//     // if (!content['title']) {
//     //   throw new Error('Did not set the title!');
//     // }

//     // await newsModel.create(content, (err) => {
//     //   if (err) throw new Error(`${err}`);
//     //   res.end();
//     // });
//   })
// );

// router.put(
//   '/boards/:id',
//   asyncHandler(async (req, res, next) => {
//     // const id = req.params.id;

//     // await newsModel.findByIdAndUpdate(id, {$set: req.body}, (err) => {
//     //   if (err) throw new Error(`${err}`);
//     //   res.end();
//     // });
//   })
// );

// router.delete(
//   '/boards/:id',
//   asyncHandler(async (req, res, next) => {
//     // const id = req.params.id;

//     // await newsModel.findByIdAndDelete(id, (err, field) => {
//     //   if (err) throw new Error(`${err}`);
//     //   res.send(field);
//     // });
//   })
// );

module.exports = router;
