import { Router } from 'express';
import { generateUser } from '../utils/utils.js';
import { fork, spawn } from 'child_process';
import path from 'path';

const router = Router();

router.get('/', async (req, res) => {
  try {
    req.logger.info('Acceso al endpoint GET /api/users');
    const users = Array.from({ length: 100 }, generateUser);
    res.json({ status: 'success', payload: users });
  } catch (error) {
    req.logger.error('Error al generar usuarios:', error);
    res.status(500).json({ status: 'error', message: 'Error al generar usuarios' });
  }
});

router.get('/generate-massive', (req, res) => {
  req.logger.info('Acceso al endpoint GET /api/users/generate-massive');
  const child = fork(path.resolve('./src/workers/generateUsersProcess.js'));

  child.send(1000);

  child.on('message', (users) => {
    req.logger.info('Usuarios generados masivamente con éxito');
    res.json({ status: 'success', payload: users });
  });

  child.on('error', (err) => {
    req.logger.error('Error en el proceso child:', err);
    res.status(500).json({ status: 'error', message: err.message });
  });
});

router.get('/process-data', (req, res) => {
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
      req.logger.error('Error en el procesamiento de datos');
      res.status(500).json({ status: 'error', message: 'Error en el procesamiento' });
    }
  });
});

export default router;
