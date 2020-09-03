import express from 'express'; 
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import SubjectsController from './controllers/SubjectsController';

const routes = express.Router();
const classesControllers = new ClassesController;
const connectionsControllers = new ConnectionsController;
const subjectsControllers = new SubjectsController;


/**
 * ROUTES - SUBJECTS
 */
routes.post('/subjects', subjectsControllers.create);
routes.get('/subjects', subjectsControllers.index);

/**
 * ROUTES - CLASSES
 */
routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

/**
 * ROUTES - CONNECTIONS
 */
routes.post('/connections', connectionsControllers.create);
routes.get('/connections', connectionsControllers.index);

/*
routes.delete('/users/:id', (request, response) => {
   console.log(request.params);
});

routes.get('/users', (request, response) => {
 
   return response.json({ 'message' : 'get' });
});
*/

export default routes;