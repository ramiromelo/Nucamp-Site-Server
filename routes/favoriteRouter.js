const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
   Favorite.find()
   .populate('comments.author')
   .then(campsites => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(campsites);
   })
   .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   Favorite.create(req.body)
   .then(campsite => {
       console.log('Campsite Created ', campsite);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(campsite);
   })
   .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
   res.statusCode = 403;
   res.end('PUT operation not supported on /campsites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   Favorite.deleteMany()
   .then(response => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(response);
   })
   .catch(err => next(err));
});


favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))



module.exports = favoriteRouter;