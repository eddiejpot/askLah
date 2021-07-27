import { resolve } from 'path';
import db from './db/models/index.mjs';
import initUsersController from './controllers/user.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);

  // special JS page. Include the webpack index.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // APIs
  app.post('/api/users', usersController.search);
  app.post('/api/adduser', usersController.create);
}
