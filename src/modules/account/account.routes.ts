import { Request, Response, Router, NextFunction } from 'express'
import AccountController from './account.contoller'

const routes = Router()
const accountController = new AccountController();

routes.post(
    '/account',
    (req: Request, res: Response) => accountController.store(req, res),
  )

  routes.get(
    '/account',
    (req: Request, res: Response) => accountController.index(req, res),
  )


export default routes;