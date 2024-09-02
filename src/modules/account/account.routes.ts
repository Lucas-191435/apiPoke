import { Request, Response, Router } from "express";
import AccountController from "./account.contoller";
import { valideteAccountToken } from "../../middlewares/valideteAccountToken";
import { validateRequest } from "../../middlewares/validateRequest";

import {
  createAccountSchema,
} from "./account.schema";


const routes = Router();

const accountController = new AccountController();

routes.post("/account",
  validateRequest(createAccountSchema),
  (req: Request, res: Response) =>
  accountController.create(req, res)
);

routes.get("/account", 
  valideteAccountToken,
  (req: Request, res: Response) =>
  accountController.index(req, res)
);

routes.get("/accountByDocument", 
  valideteAccountToken,
  (req: Request, res: Response) =>
  accountController.accountByDocument(req, res)
);

routes.get(
  "/accountByToken",
  valideteAccountToken,
  (req: Request, res: Response) => accountController.accountByToken(req, res)
);

routes.post("/loginAccountFistStep", (req: Request, res: Response) =>
  accountController.loginAccountFistStep(req, res)
);

routes.post("/loginAccountSecondStep", (req: Request, res: Response) =>
  accountController.loginAccountSecondStep(req, res)
);


routes.post("/testeInteracao", (req: Request, res: Response) =>
  accountController.testeInteracao(req, res)
);

export default routes;
