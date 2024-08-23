

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

class AccountService implements IAccountService {
    async store({
        name,
        email
    }: ICreateAccountDTO): Promise<IAccountDocument | null> {
        try {

            const user = await prismaClient.account.create({
                data: {
                    name,
                    email
                },
            })

            return user || null;
        } catch (e: any) {

            return null;
        }
    }

    async findAndCountAll({
        page,
        pageSize,
        query,
    }: any): Promise<any | null> {
        try {
            const {} = JSON.parse(query);

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
                pageSize: +pageSize || 5,
                page: +page || 0,
              }
        } catch (e: any) {
            console.log(e)
            return null;
        }
    }

}

export default AccountService