const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const RecipeSchema = new mongoose.Schema({

    medicine_description: {
        type: String,
        require: true
    },
    medicine_quantity: {
        type: String,
        require: true
    },
    medicine_dosage: {
        type: String,
        require: true
    },
    medicine_frequency_use: {
        type: String,
        require: true
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        require: true,
    },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;