import { resolve } from 'path';
import db from './db/models/index.mjs';
import initUsersController from './controllers/user.mjs';
import initSessionsController from './controllers/session.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  const sessionsController = initSessionsController(db);

  // homepage
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // sessions
  app.get('/session/:id', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // APIs
  app.post('/api/users', usersController.search);
  app.post('/api/adduser', usersController.create);
  app.get('/api/sessions', sessionsController.search);
  app.post('/api/addsession', sessionsController.create);
  app.get('/api/allsessions', sessionsController.index);
}
