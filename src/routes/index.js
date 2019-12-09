const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('El Backend está corriendo')
})

module.exports = router