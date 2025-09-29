const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/stud/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Welcome to this page - ${username}`);
});

router.post('/prof/:username', (req, res) => {
    const { username } = req.params;

    res.send(`Welcome to this page - ${username}`);
});

router.post('/emp', (req, res) => {
    res.send(`Hey you are new here`);
});

module.exports = router;
