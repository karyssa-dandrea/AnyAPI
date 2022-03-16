const { Router } = require('express');
const Member = require('../models/Member');

module.exports = Router()
  .post('/', async (req, res) => {
    const troupe = await Member.insert(req.body);
    res.send(troupe);
  })

  .get('/', async (req, res) => {
    const member = await Member.findAll();
    res.send(member);
  })

  .get('/', async (req, res, next) => {
    try {
      const phantom = await Member.findById(req.params.id);
      res.send(phantom);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
