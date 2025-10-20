const express = require('express');
const router = express.Router();
const { login, logout, getCurrentUser } = require('../controllers/userController');

router.post('/login', login);
router.post('/logout', logout);
router.get('/current-user', getCurrentUser);

module.exports = router;
