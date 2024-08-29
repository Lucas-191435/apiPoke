import { Request, Response } from "express";
import AccountService from "./account.service";
import { IError } from "src/types/generics";



class AccountController {
    private accountService: AccountService;

    constructor() {
        this.accountService = new AccountService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = {
                name: 'Teste create',
                document: "35715862043",
                limit: 1000,
                programId: 10,
            };

            const account = await this.accountService.create({
                data
            });

            return res.status(201).json({ message: "Conta adicionada.", data: account });
        } catch (error) {
            const err = error as IError;
            return res.status(err.statusCode || 500).json({ message: err.message, details: err.details });
        }

    }

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const { page = 0, pageSize = 0, search = '' } = req.query
            let accounts

            accounts = await this.accountService.findAndCountAll({
                page: +page || 0,
                pageSize: +pageSize || 0,
                query: JSON.stringify({
                    search,
                })
            })

            return res.status(201).json({ message: "Contas", data: accounts });
        } catch (error) {
            const err = error as IError;
            return res.status(err.statusCode || 500).json({ message: err.message, details: err.details });
        }
    }

    async accountByDocument(req: Request, res: Response): Promise<Response> {
        try {
            const { document } = req.query

            let accounts = await this.accountService.findByDocument(document as string)

            return res.status(201).json({ message: "Contas", data: accounts });
        } catch (error) {
            const err = error as IError;
            return res.status(err.statusCode || 500).json({ message: err.message, details: err.details });
        }
    }

    async accountByToken(req: Request, res: Response): Promise<Response> {
        try {
            const { document } = req.query

            let accounts = await this.accountService.findByToken(document as string)

            return res.status(201).json({ message: "Contas", data: accounts });
        } catch (error) {
            const err = error as IError;
            return res.status(err.statusCode || 500).json({ message: err.message, details: err.details });
        }
    }


    async loginAccountFistStep(req: Request, res: Response): Promise<Response> {
        try {
            const { document } = req.body

            let accounts = await this.accountService.loginAccountFistStep(document as string)

            return res.status(201).json({ message: "Conta", data: accounts });
        } catch (error) {
            const err = error as IError;
            return res.status(err.statusCode || 500).json({ message: err.message, details: err.details });
        }
    }

    async loginAccountSecondStep(req: Request, res: Response): Promise<Response> {
        try {
            const { authCode } = req.body

            let accounts = await this.accountService.loginAccountSecondStep(authCode as string)

            return res.status(201).json({ message: "Conta", data: accounts });
        } catch (error) {
            const err = error as IError;
            return res.status(err.statusCode || 500).json({ message: err.message, details: err.details });
        }
    }

}

export default AccountController;