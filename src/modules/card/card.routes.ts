import { Request, Response, Router, NextFunction } from 'express'
import CardController from './card.contoller'

const routes = Router()
const cardController = new CardController();

routes.post(
    '/card',
    (req: Request, res: Response) => cardController.create(req, res),
  )

  // routes.get(
  //   '/card',
  //   (req: Request, res: Response) => cardController.index(req, res),
  // )

  // routes.get(
  //   '/cardByDocument',
  //   (req: Request, res: Response) => cardController.cardByDocument(req, res),
  // )

export default routes;