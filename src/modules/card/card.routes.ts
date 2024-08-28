import { Request, Response, Router, NextFunction } from 'express'
import AccountController from './card.contoller'

const routes = Router()
const accountController = new AccountController();

routes.post(
    '/account',
    (req: Request, res: Response) => accountController.create(req, res),
  )

  routes.get(
    '/account',
    (req: Request, res: Response) => accountController.index(req, res),
  )

  routes.get(
    '/accountByDocument',
    (req: Request, res: Response) => accountController.accountByDocument(req, res),
  )

  routes.post(
    '/loginAccountFistStep',
    (req: Request, res: Response) => accountController.loginAccountFistStep(req, res),
  )

  routes.post(
    '/loginAccountSecondStep',
    (req: Request, res: Response) => accountController.loginAccountSecondStep(req, res),
  )


export default routes;