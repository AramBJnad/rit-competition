const User = require('../models/User');

// In-memory session management (for simplicity)
let currentUser = null;

const login = (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    currentUser = new User(username);
    res.status(200).json({ message: 'Login successful', user: currentUser });
};

const logout = (req, res) => {
    currentUser = null;
    res.status(200).json({ message: 'Logout successful' });
};

const getCurrentUser = (req, res) => {
    if (currentUser) {
        res.status(200).json({ user: currentUser });
    } else {
        res.status(404).json({ message: 'No user is currently logged in' });
    }
};

module.exports = {
    login,
    logout,
    getCurrentUser,
};
