const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const DoctorSchema = new mongoose.Schema({

    cpf: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        unique: true,
        require: true
    },
    date_birth: {
        type: String,
        require: true
    },
    crm: {
        type: String,
        unique: true,
        require: true
    },
    crm_state: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    password_confirm: {
        type: String,
        require: true,
        select: false,
    },
});

DoctorSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;