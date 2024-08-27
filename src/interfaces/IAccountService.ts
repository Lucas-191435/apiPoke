import { Account } from "@prisma/client";
import { GetAllArgs, IError, ServiceFn, TRows } from "src/types/generics";

export namespace AppAccountService {

    export namespace GetAllAccountDTO {
        export type Args = GetAllArgs<Account>
        export type Result = TRows<{
            id: string,
                    document: string,
                    name: string,
                    createdAt: Date,
        } | IError>;
        export type Handler = ServiceFn<Args, Promise<Result>>;
    }

    export namespace Create {
        export type Args = {
            data: {
                name: string;
                document: string
                limit: number;
                programId: number;
            };
            file?: any;
        }
        export type Result = Account | IError;
        export type Handler = ServiceFn<Args, Promise<Result>>;
    }

    export namespace FindByDocument {
        export type Args = string
        export type Result = Account | null | IError;
        export type Handler = ServiceFn<Args, Promise<Result>>;
    }

    export namespace LoginAccountFistStep {
        export type Args = string
        export type Result = {
            document: string
            name: string
        } | null | IError;
        export type Handler = ServiceFn<Args, Promise<Result>>;
    }

    export namespace LoginAccountSecondStep {
        export type Args = string
        export type Result = {
            document: string
            name: string
            id: string
            token: string
        } | null | IError;
        export type Handler = ServiceFn<Args, Promise<Result>>;
    }

    export interface IAccountService {
        findAndCountAll: AppAccountService.GetAllAccountDTO.Handler;
        create: AppAccountService.Create.Handler;
        findByDocument: AppAccountService.FindByDocument.Handler;
        loginAccountFistStep: AppAccountService.LoginAccountFistStep.Handler;
    }
}


