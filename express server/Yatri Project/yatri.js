const express = require('express');
const router = express.Router();
const convergentRoutes = require('./convergent_route');
router.use(express.json());

router.use('/yatri/profile', convergentRoutes);

module.exports = router;
