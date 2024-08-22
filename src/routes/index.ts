import { Router } from 'express';

const router = Router();

// Defina suas rotas aqui
router.get('/example', (req, res) => {
  res.send('Example route');
});

export default router;