import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  req.logger.debug('Este es un log de nivel debug');
  req.logger.http('Este es un log de nivel http');
  req.logger.info('Este es un log de nivel info');
  req.logger.warning('Este es un log de nivel warning');
  req.logger.error('Este es un log de nivel error');
  req.logger.fatal('Este es un log de nivel fatal');
  res.send('Prueba de logging completa. Revisa los logs.');
});

export default router;
