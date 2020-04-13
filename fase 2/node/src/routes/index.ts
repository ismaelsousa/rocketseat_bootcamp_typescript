import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ true: true });
});
export default routes;
