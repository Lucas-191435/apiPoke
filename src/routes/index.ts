import { Router } from 'express';
import AccountRoutes from "../modules/account/account.routes";
const router = Router();

// Defina suas rotas aqui
// router.get('/example', (req, res) => {
//   res.send('Example route');
// });

export default [
  AccountRoutes,
];