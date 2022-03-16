const { Router } = require('express');
const Member = require('../models/Member');

module.exports = Router().post('/', async (req, res) => {
  const troupe = await Member.insert(req.body);
  res.send(troupe);
});
