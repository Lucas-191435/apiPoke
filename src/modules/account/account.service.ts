import { Prisma } from "@prisma/client";
import prismaClient from "../../database/index";
import { AppAccountService } from "../../interfaces/IAccountService";
import { whatsApiClient } from "../../services/whatsAppAPI";
import axios from "axios";
import { JsonWebTokenError, sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { generateCode } from "../../utils/helpers";

JsonWebTokenError;
class AccountService implements AppAccountService.IAccountService {
  create: AppAccountService.Create.Handler = async ({ data }) => {
    try {
      const { name, document } = data;
      const account = await prismaClient.account.create({
        data: {
          name,
          document,
        },
      });
      return account;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          error.code === "P2002" &&
          error.meta?.target === "Account_document_key"
        ) {
          throw {
            message: "Já existe uma conta com esse documento!",
            statusCode: 409,
          };
        }
      }

      throw {
        message: "Falhou ao criar a conta!",
        statusCode: 500,
        details: error,
      };
    }
  };

  findAndCountAll: AppAccountService.GetAllAccountDTO.Handler = async ({
    page,
    pageSize,
    query,
  }) => {
    try {
      const {} = JSON.parse(query);

      const conditions: Array<Record<string, any>> = [];
      const where: Prisma.AccountFindManyArgs["where"] = {
        AND: conditions.length > 0 ? conditions : undefined,
      };

      const count = await prismaClient.account.count({ where });
      const accounts = await prismaClient.account.findMany({
        where: {},
        select: {
          id: true,
          document: true,
          name: true,
          createdAt: true,
        },
      });

      return {
        count,
        rows: accounts,
        pageSize,
        page,
      };
    } catch (error) {
      throw {
        message: "Falhou pegar contas",
        statusCode: 500,
        details: error,
      };
    }
  };

  findByDocument: AppAccountService.FindByDocument.Handler = async (
    document
  ) => {
    try {
      if (!document) {
        throw { message: "Documento não fornecido", statusCode: 400 };
      }
      const account = await prismaClient.account.findFirst({
        where: { document },
      });

      return account;
    } catch (error) {
      throw {
        message: "Falhou pegar contas",
        statusCode: 500,
        details: error,
      };
    }
  };

  findByToken: AppAccountService.FindByDocument.Handler = async (id) => {
    try {
      if (!id) {
        throw { message: "Conta não fornecida!", statusCode: 400 };
      }
      console.log("token: " + id);
      const account = await prismaClient.account.findFirst({ where: { id } });

      return account;
    } catch (error) {
      throw {
        message: "Falhou pegar contas",
        statusCode: 500,
        details: error,
      };
    }
  };

  loginAccountFistStep: AppAccountService.LoginAccountFistStep.Handler = async (
    document
  ) => {
    try {
      if (!document) {
        throw { message: "Documento não fornecido", statusCode: 400 };
      }

      const account = await prismaClient.account.findUnique({
        where: { document: document },
        include: { phones: true },
      });

      if (!account) {
        throw { message: "Conta não encontrada", statusCode: 404 };
      }

      if (!account.status) {
        throw { message: "Conta não ativa", statusCode: 404 };
      }

      if (account.phones.length < 0) {
        throw { message: "Conta sem telefone", statusCode: 404 };
      }

      console.log(account);

      if (
        account.authCode === null ||
        (account.authCode &&
          account.expiresAt &&
          new Date() > account.expiresAt)
      ) {
        const { authCode, expiresAt } = generateCode();

        await prismaClient.account.update({
          where: { id: account.id },
          data: {
            authCode,
            expiresAt,
          },
        });
        await whatsApiClient
          .post("/Whatsapp/Api", {
            code: account.phones[0].country_code,
            numero: account.phones[0].phone,
            text: "Código de autenticação WebApp-Eazy: " + authCode,
          })
          .then((response) => console.log("---"))
          .catch((err) => console.log(err));
      }

      return {
        name: account.name,
        document: account.document,
      };
    } catch (error) {
      console.log(error);
      throw {
        message: "Falhou pegar contas",
        statusCode: 500,
        details: error,
      };
    }
  };

  loginAccountSecondStep: AppAccountService.LoginAccountSecondStep.Handler =
    async (authCode) => {
      try {
        const account = await prismaClient.account.findFirst({
          where: { authCode },
        });

        if (!account) {
          throw { message: "Conta não encontrada", statusCode: 404 };
        }

        if (account.expiresAt && new Date() > account.expiresAt) {
          throw { message: "Código expirado!", statusCode: 401 };
        }

        const token = sign({}, String(process.env.SECRET_KEY), {
          subject: String(account.id),
          expiresIn: "24h", // 12 hours
          algorithm: "HS512",
        });

        return {
          token,
          id: account.id,
          name: account.name,
          document: account.document,
        };
      } catch (error) {
        throw {
          message: "Falho etapa login!",
          statusCode: 500,
          details: error,
        };
      }
    };
}

export default AccountService;
