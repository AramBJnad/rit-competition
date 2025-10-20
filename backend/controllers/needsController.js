const Need = require('../models/Need');

// Placeholder for database
let needs = [
    new Need(1, 'Winter Coats', 'New winter coats for children.', 500),
    new Need(2, 'School Supplies', 'Backpacks, notebooks, and pencils.', 250),
    new Need(3, 'Canned Goods', 'Non-perishable food items.', 300),
];
let fundingBasket = [];

// --- Helper Functionality ---

const getNeeds = (req, res) => {
    // In a real application, this would fetch from a database.
    res.status(200).json(needs);
};

const searchNeeds = (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ message: 'Search keyword is required' });
    }
    const filteredNeeds = needs.filter(need => 
        need.name.toLowerCase().includes(keyword.toLowerCase()) || 
        need.description.toLowerCase().includes(keyword.toLowerCase())
    );
    res.status(200).json(filteredNeeds);
};

const getFundingBasket = (req, res) => {
    res.status(200).json(fundingBasket);
};

const addToFundingBasket = (req, res) => {
    const { needId } = req.body;
    const need = needs.find(n => n.id === parseInt(needId));
    if (!need) {
        return res.status(404).json({ message: 'Need not found' });
    }
    if (fundingBasket.find(n => n.id === need.id)) {
        return res.status(400).json({ message: 'Need is already in the basket' });
    }
    fundingBasket.push(need);
    res.status(200).json({ message: 'Need added to basket', fundingBasket });
};

const removeFromFundingBasket = (req, res) => {
    const { needId } = req.params;
    fundingBasket = fundingBasket.filter(n => n.id !== parseInt(needId));
    res.status(200).json({ message: 'Need removed from basket', fundingBasket });
};

const checkout = (req, res) => {
    // In a real application, this would process the funding.
    fundingBasket = [];
    res.status(200).json({ message: 'Checkout successful. Thank you for your contribution!' });
};

// --- U-fund Manager Functionality ---

const addNeed = (req, res) => {
    const { name, description, amount } = req.body;
    const newId = needs.length > 0 ? Math.max(...needs.map(n => n.id)) + 1 : 1;
    const newNeed = new Need(newId, name, description, amount);
    needs.push(newNeed);
    res.status(201).json({ message: 'Need added successfully', need: newNeed });
};

const updateNeed = (req, res) => {
    const { needId } = req.params;
    const { name, description, amount } = req.body;
    const needIndex = needs.findIndex(n => n.id === parseInt(needId));
    if (needIndex === -1) {
        return res.status(404).json({ message: 'Need not found' });
    }
    needs[needIndex] = { ...needs[needIndex], name, description, amount };
    res.status(200).json({ message: 'Need updated successfully', need: needs[needIndex] });
};

const deleteNeed = (req, res) => {
    const { needId } = req.params;
    needs = needs.filter(n => n.id !== parseInt(needId));
    res.status(200).json({ message: 'Need deleted successfully' });
};

module.exports = {
    getNeeds,
    searchNeeds,
    getFundingBasket,
    addToFundingBasket,
    removeFromFundingBasket,
    checkout,
    addNeed,
    updateNeed,
    deleteNeed,
};
