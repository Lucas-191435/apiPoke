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
                email: "teste@example.com"
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

}

export default AccountController;