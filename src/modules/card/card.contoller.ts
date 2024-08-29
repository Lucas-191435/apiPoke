import { Request, Response } from "express";
import CardService from "./card.service";
import { IError } from "../../types/generics";



class CardController {
    private cardService: CardService;

    constructor() {
        this.cardService = new CardService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = {
                name: 'Teste create',
                document: "35715862043",
                limit: 1000,
                programId: 10,
            };

            const card = await this.cardService.create({
                data
            });

            return res.status(201).json({ message: "Conta adicionada.", data: card });
        } catch (error) {
            const err = error as IError;
            return res.status(err.details.statusCode || 500).json({ message: err.message, details: err.details });
        }

    }

    // async index(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const { page = 0, pageSize = 0, search = '' } = req.query
    //         let cards

    //         cards = await this.cardService.findAndCountAll({
    //             page: +page || 0,
    //             pageSize: +pageSize || 0,
    //             query: JSON.stringify({
    //                 search,
    //             })
    //         })

    //         return res.status(201).json({ message: "Contas", data: cards });
    //     } catch (error) {
    //         const err = error as IError;
    //         return res.status(err.details.statusCode || 500).json({ message: err.message, details: err.details });
    //     }
    // }

    // async cardByDocument(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const { document } = req.query

    //         let cards = await this.cardService.findByDocument(document as string)

    //         return res.status(201).json({ message: "Contas", data: cards });
    //     } catch (error) {
    //         const err = error as IError;
    //         return res.status(err.details.statusCode || 500).json({ message: err.message, details: err.details });
    //     }
    // }
}

export default CardController;