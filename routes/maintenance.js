const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota maintenance funcionando');
});

module.exports = router;
