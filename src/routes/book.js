const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('Express RESful API')
})

module.exports = router