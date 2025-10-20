const express = require('express');
const router = express.Router();
const {
    getNeeds,
    searchNeeds,
    getFundingBasket,
    addToFundingBasket,
    removeFromFundingBasket,
    checkout,
    addNeed,
    updateNeed,
    deleteNeed,
} = require('../controllers/needsController');

// --- Helper Routes ---
router.get('/', getNeeds);
router.get('/search', searchNeeds);
router.get('/basket', getFundingBasket);
router.post('/basket', addToFundingBasket);
router.delete('/basket/:needId', removeFromFundingBasket);
router.post('/checkout', checkout);

// --- U-fund Manager Routes ---
router.post('/', addNeed);
router.put('/:needId', updateNeed);
router.delete('/:needId', deleteNeed);

module.exports = router; 
