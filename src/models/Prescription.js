const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const PrescriptionSchema = new mongoose.Schema({

    doctor_crm: {
        type: String,
        unique: true,
        require: true
    },
    state_crm: {
        type: String,
        require: true
    },
    doctor_cpf: {
        type: String,
        require: true
    },
    doctor_name: {
        type: String,
        require: true
    },
    patient_cpf: {
        type: String,
        require: true
    },
    patient_name: {
        type: String,
        require: true
    },
    patient_date_birth: {
        type: String,
        require: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        require: true,
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    }]
});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

module.exports = Prescription;