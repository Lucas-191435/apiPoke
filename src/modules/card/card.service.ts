import { Prisma } from '@prisma/client';
import prismaClient from '../../database/index'
import { AppCardService } from 'src/interfaces/ICardService';
import { whatsApiClient } from 'src/services/whatsAppAPI';
import axios from 'axios';
import { JsonWebTokenError, sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { generateCode } from 'src/utils/helpers';

JsonWebTokenError
class CardService implements AppCardService.ICardService {
    create: AppCardService.Create.Handler = async ({
        data
    }) => {
        try {
            // const { name,
            //     document,
            // } = data;
            // const card = await prismaClient.card.create({
            //     data: {
            //         name,
            //     },
            // });
            // // return card;

            throw {
                message: 'Falhou ao criar a card!',
                statusCode: 500,
                details: '',
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002' && error.meta?.target === 'Card_document_key') {
                    throw {
                        message: 'Já existe uma conta com esse documento!',
                        statusCode: 409,
                    };
                }
            }
            throw {
                message: 'Falhou ao criar a conta!',
                statusCode: 500,
                details: error,
            };
        }
    }

    // findAndCountAll: AppCardService.GetAllCardDTO.Handler = async ({
    //     page,
    //     pageSize,
    //     query,
    // }) => {
    //     try {
    //         const { } = JSON.parse(query);

    //         const conditions: Array<Record<string, any>> = [];
    //         const where: Prisma.CardFindManyArgs["where"] = {
    //             AND: conditions.length > 0 ? conditions : undefined,
    //         };

    //         const count = await prismaClient.card.count({ where });
    //         const cards = await prismaClient.card.findMany({
    //             where: {},
    //             select: {
    //                 id: true,
    //                 document: true,
    //                 name: true,
    //                 createdAt: true,
    //             }
    //         })

    //         return {
    //             count,
    //             rows: cards,
    //             pageSize,
    //             page,
    //         }

    //     } catch (error) {

    //         throw {
    //             message: 'Falhou pegar contas',
    //             statusCode: 500,
    //             details: error,
    //         };
    //     }
    // }


    // findByDocument: AppCardService.FindByDocument.Handler = async (document) => {
    //     try {
    //         const card = await prismaClient.card.findFirst({ where: { document } })

    //         return card;
    //     } catch (error) {
    //         throw {
    //             message: 'Falhou pegar contas',
    //             statusCode: 500,
    //             details: error,
    //         };
    //     }
    // }
}

export default CardService