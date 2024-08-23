

interface ICreateAccountDTO {
    email: string;
    name: string;
}

interface IAccountDocument {
    id: string;
    email: string;
    name: string | null;
}

interface IAccountService {
    store(data: ICreateAccountDTO): Promise<IAccountDocument | null>;
}

import { Prisma } from '@prisma/client';
import prismaClient from '../../database/index'
import { GetAllArgs } from 'src/types/generics';
import { AppAccountService } from 'src/interfaces/IAccountService';

class AccountService implements AppAccountService.IAccountService {
    create: AppAccountService.Create.Handler = async({
        data
    }) => {
        try {
            const { name, email } = data;
            const account = await prismaClient.account.create({
                data: {
                    name,
                    email,
                },
            });
            return account;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002' && error.meta?.target === 'Account_email_key') {
                    throw {
                        message: 'Já existe uma conta com esse email!',
                        statusCode: 409, // HTTP 409 Conflict
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

    findAndCountAll: AppAccountService.GetAllAccountDTO.Handler = async ({
        page,
        pageSize,
        query,
    }) => {
        const { } = JSON.parse(query);

        const conditions: Array<Record<string, any>> = [];
        const where: Prisma.AccountFindManyArgs["where"] = {
            AND: conditions.length > 0 ? conditions : undefined,
        };

        const count = await prismaClient.account.count({ where });
        const accounts = await prismaClient.account.findMany({
            where: {},
        })

        return {
            count,
            rows: accounts,
            pageSize,
            page,
        }
    }

}

export default AccountService