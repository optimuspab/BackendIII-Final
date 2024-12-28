import { generateUser } from '../utils/utils.js';

process.on('message', (numUsers) => {
  const users = Array.from({ length: numUsers }, generateUser);
  process.send(users);
});