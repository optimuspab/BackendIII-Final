import { Router } from 'express';
import { generateUser, generatePet } from '../utils/utils.js';
import { UsersModel, PetsModel } from '../models/models.js';
import { fork } from 'child_process';
import path from 'path';

const router = Router();

router.get('/mockingpets', async (req, res, next) => {
    const quantity = parseInt(req.query.quantity, 10) || 100;

    if (isNaN(quantity) || quantity <= 0) {
        return next({ key: 'INVALID_INPUT', message: 'El parámetro quantity debe ser un número positivo.' });
    }

    const pets = Array.from({ length: quantity }, generatePet);

    const formattedPets = pets.map(pet => ({
        ...pet,
        owner: null,
        adopted: false,
    }));

    res.json({ status: 'success', payload: formattedPets });
});

router.get('/mockingusers', async (req, res) => {
    const quantity = parseInt(req.query.quantity, 10) || 50;

    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({
            status: 'error',
            message: 'El parámetro quantity debe ser un número positivo.',
        });
    }

    const users = Array.from({ length: quantity }, generateUser);
    res.json({ status: 'success', payload: users });
});

router.post('/generateData', async (req, res, next) => {
    const { users, pets } = req.body;

    if (typeof users !== 'number' || typeof pets !== 'number') {
        return next({ key: 'INVALID_INPUT' });
    }

    if (users <= 0 || pets <= 0) {
        return next({ key: 'INVALID_INPUT', message: 'Los valores de users y pets deben ser mayores que 0.' });
    }

    try {
        const generatedUsers = Array.from({ length: users }, generateUser);
        const generatedPets = Array.from({ length: pets }, generatePet);

        await UsersModel.insertMany(generatedUsers);
        await PetsModel.insertMany(generatedPets);

        res.json({
            status: 'success',
            message: 'Datos generados correctamente',
        });
    } catch (error) {
        next({ key: 'SERVER_ERROR', message: error.message });
    }
});

router.post('/generate-massive', (req, res, next) => {
    const { users } = req.body;

    if (!users) {
        return next({ key: 'MISSING_PARAMETERS', message: 'El parámetro users es requerido.' });
    }

    const child = fork(path.resolve('./src/workers/generateUsersProcess.js'));
    child.send(users);

    child.on('message', (generatedUsers) => {
        res.json({ status: 'success', payload: generatedUsers });
    });

    child.on('error', (err) => {
        next({ key: 'SERVER_ERROR', message: err.message });
    });
});

export default router;
