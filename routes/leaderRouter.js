const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leader = require('../models/leaders');
var authenticate = require('../authenticate');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
.get(cors.cors, (req, res, next)=>{
  Leader.find({})
  .then((leaders)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leaders);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
  Leader.create(req.body)
  .then((lead)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(lead);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
  res.statusCode = 403;
  res.end("PUT operation is not supported on /leaders");
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res,next)=>{
  Leader.remove({})
  .then((resp)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
  },(err)=>next(err))
  .catch((err)=>next(err));
});
leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
.get(cors.cors, (req, res, next)=>{
  Leader.findById(req.params.leaderId)
  .then((lead)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'applicaton/json');
    res.json(lead);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
  res.statusCode = 403
  res.end("POST operation is not supported on /leader/"+req.params.leaderId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
  Leader.findByIdAndUpdate(req.params.leaderId,{
    $set:req.body
  },{new:true})
  .then((lead)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'applicaton/json');
    res.json(lead);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
  Leader.findByIdAndRemove(req.params.leaderId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = leaderRouter;
