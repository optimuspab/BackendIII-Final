import cluster from 'cluster';
import { cpus } from 'os';
import app from './src/app.js';

const PORT = process.env.PORT || 8080;
const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Número de CPUs disponibles: ${numCPUs}`);
  console.log(`Proceso primario iniciado. PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} murió. Código: ${code}, Señal: ${signal}`);
    console.log('Creando un nuevo worker...');
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker escuchando en http://localhost:${PORT}. PID: ${process.pid}`);
  });
}
