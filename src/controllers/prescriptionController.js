const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Prescription = require('../models/Prescription');
const Recipe = require('../models/Recipe');
const router = express.Router();

router.use(authMiddleware);

router.get('/recipes', async (request, response) => {
    try {
        const prescriptions = await Prescription.find().populate(['doctor', 'recipes']);
        return response.send({ prescriptions });

    } catch (error) {
        return response.status(400).send({ error: 'Error loading prescriptions' }) 
    }

});

router.get('/', async (request, response) => {
    try {
        const prescriptions = await Prescription.find().populate(['doctor']);
        return response.send({ prescriptions });

    } catch (error) {
        return response.status(400).send({ error: 'Error loading prescriptions' }) 
    }

});


router.get('/:prescriptionId', async (request, response) => {
    
    try {
        const prescription = await Prescription.findById(request.params.prescriptionId).populate(['doctor', 'recipes']);
        return response.send({ prescription });

    } catch (error) {
        return response.status(400).send({ error: 'Error loading prescription' }) 
    }

})

router.post('/', async (request, response) => {
    try {
        const { doctor_crm,state_crm,doctor_cpf,doctor_name,patient_cpf,patient_name,patient_date_birth, recipes} = request.body;
        const prescription = await Prescription.create({ doctor_crm,state_crm,doctor_cpf,doctor_name,patient_cpf,patient_name,patient_date_birth, doctor: request.doctorId  })

        await Promise.all(recipes.map(async recipe => {
            const prescriptionRecipe = new Recipe({ ...recipe, prescription: prescription._id });

            await prescriptionRecipe.save();

            prescription.recipes.push(prescriptionRecipe);
        }))

        await prescription.save();

        return response.send({ prescription });

    } catch (error) {
        return response.status(400).send({ error: 'Error creating new prescription' })
    }
})

module.exports = app => app.use('/prescriptions', router);