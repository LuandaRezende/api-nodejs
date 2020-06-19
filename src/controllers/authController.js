const express = require('express');
const Doctor = require('../models/Doctor');
const Prescription = require('../models/Prescription');
const { request } = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
}

router.post('/register', async (request, response) => {
    
    const { cpf, password, password_confirm } = request.body;
    
    try{

        if (await Doctor.findOne({ cpf }))
            return response.status(400).send({ error: 'Doctor already exists'});

        if(!request.body.password !=  request.body.password_confirm ){
            return response.status(400).send({ error: 'Different passwords'});
        }

        const doctor = await Doctor.create(request.body);
        
        doctor.password = undefined;
        doctor.password_confirm = undefined;
        

        return response.send( { 
            doctor,
            token: generateToken({ id: doctor.id }),            
        });
    }catch(error) {
        return response.status(400).send({ error: 'Registration failed'});
    }
});

router.post('/authenticate', async (request, response) => {
    const { email, password } = request.body;
    const doctor = await Doctor.findOne({ email }).select('+password');

    if (!doctor){
        return response.status(400).send({ error: 'Doctor not found'});
    }

    if (!await bcrypt.compare(password, doctor.password)){
        return response.status(400).send({error: 'Invalid password' });
    }

    doctor.password = undefined;

    response.send({ 
    doctor, 
    token: generateToken({ id: doctor.id }),
    });

});

router.get('/doctors', async (request, response) => {
    
    try {
        const doctors = await Doctor.find();

        return response.send({ doctors });

    } catch (error) {
        return response.status(400).send({ error: 'Error loading doctors' }) 
    }

})


router.get('/:doctorId', async (request, response) => {
    
    try {
        const doctor = await Doctor.findById(request.params.doctorId).populate(['doctor']);

        return response.send({ doctor });

    } catch (error) {
        return response.status(400).send({ error: 'Error loading doctor for id' }) 
    }

})

module.exports = app => app.use('/auth', router);