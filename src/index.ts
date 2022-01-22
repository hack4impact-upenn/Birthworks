import socket from 'socket.io';
import expressStatusMonitor from 'express-status-monitor';
import createServer from './utils/createServer';
import { sync } from './utils/wordpress/wordpress';
import db from './utils/database';
import { Customer, ICustomer } from './models/customer.model';
import { Cert, ICert } from './models/cert.model';
import './utils/config';

const main = async () => {
  // listen for termination
  process.on('SIGTERM', () => process.exit());
  await db.open();

  const app = createServer();
  const server = app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Control-C to stop\n');
  });

  const io = socket(server);
  io.on('connection', (soc) => {
    console.log('Connected...');
    soc.on('disconnect', () => {
      console.log('Disconnected');
    });
  });

  app.set('socketio', io);
  app.use(expressStatusMonitor({ websocket: io }));

  setInterval(async () => {
    await sync();
  }, 1000 * 60 * 60 * 12);
};

main();
