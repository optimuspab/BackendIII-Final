import { Router } from 'express';
import { generateUser } from '../utils/utils.js';
import { fork, spawn } from 'child_process';
import path from 'path';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        req.logger.info('Acceso al endpoint GET /api/users');
        const users = Array.from({ length: 100 }, generateUser);
        res.json({ status: 'success', payload: users });
    } catch (error) {
        next({ key: 'SERVER_ERROR', message: 'Error al generar usuarios.' });
    }
});

router.get('/generate-massive', (req, res, next) => {
    req.logger.info('Acceso al endpoint GET /api/users/generate-massive');
    const child = fork(path.resolve('./src/workers/generateUsersProcess.js'));

    child.send(1000);

    child.on('message', (users) => {
        req.logger.info('Usuarios generados masivamente con éxito');
        res.json({ status: 'success', payload: users });
    });

    child.on('error', (err) => {
        next({ key: 'SERVER_ERROR', message: err.message });
    });
});

router.get('/process-data', (req, res, next) => {
    req.logger.info('Acceso al endpoint GET /api/users/process-data');
    const users = [
        { name: 'Juan', isPremium: true },
        { name: 'Maria', isPremium: false },
        { name: 'Luis', isPremium: true },
    ];

    const pythonProcess = spawn('python', [path.resolve('./src/workers/processData.py')]);

    pythonProcess.stdin.write(JSON.stringify(users));
    pythonProcess.stdin.end();

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        req.logger.error(`Error en el proceso de Python: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            req.logger.info('Procesamiento de datos finalizado con éxito');
            res.json({ status: 'success', result });
        } else {
            next({ key: 'SERVER_ERROR', message: 'Error en el procesamiento de datos.' });
        }
    });
});

export default router;
