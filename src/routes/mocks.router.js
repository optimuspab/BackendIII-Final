import { Router } from 'express';
import { generateUser, generatePet } from '../utils/utils.js';
import { UsersModel, PetsModel } from '../models/models.js';
import { fork } from 'child_process';
import path from 'path';

const router = Router();

router.get('/mockingpets', async (req, res) => {
    const pets = Array.from({ length: 50 }, generatePet);
    res.json({ status: 'success', payload: pets });
});

router.get('/mockingusers', async (req, res) => {
    const users = Array.from({ length: 50 }, generateUser);
    res.json({ status: 'success', payload: users });
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).json({
            status: 'error',
            message: 'Parámetros users y pets son requeridos',
        });
    }

    const generatedUsers = Array.from({ length: users }, generateUser);
    const generatedPets = Array.from({ length: pets }, generatePet);

    try {
        await UsersModel.insertMany(generatedUsers);
        await PetsModel.insertMany(generatedPets);

        res.json({
            status: 'success',
            message: 'Datos generados correctamente',
        });
    } catch (error) {
        console.error('Error al insertar datos en MongoDB:', error);
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

router.post('/generate-massive', (req, res) => {
    const { users } = req.body;

    if (!users) {
        return res.status(400).json({ status: 'error', message: 'Parámetro users es requerido' });
    }

    const child = fork(path.resolve('./src/workers/generateUsersProcess.js'));
    child.send(users);

    child.on('message', (generatedUsers) => {
        res.json({ status: 'success', payload: generatedUsers });
    });

    child.on('error', (error) => {
        res.status(500).json({ status: 'error', message: error.message });
    });
});

export default router;
