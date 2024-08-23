import { Request, Response } from "express";
import AccountService from "./account.service";



class AccountController {
    private accountService: AccountService;

    constructor() {
        this.accountService = new AccountService();
    }

    async store(req: Request, res: Response): Promise<Response> {
        const data = {
            name: 'Teste create',
            email: "teste@example.com"
        };

        const account = await this.accountService.store(data);

        return res.status(201).json({ message: "Conta adicionada.", data: account });
    }

    async index(req: Request, res: Response): Promise<Response> {
        const { page = 0, pageSize = 0, search = '' } = req.query
        let accounts

        accounts = await this.accountService.findAndCountAll({
            page,
            pageSize,
            query: JSON.stringify({
                search,
            })
        })

        return res.status(201).json({ message: "Contas", data: accounts });
    }

}

export default AccountController;