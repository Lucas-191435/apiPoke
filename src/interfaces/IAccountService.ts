import { Account } from "@prisma/client";
import { GetAllArgs, IError, ServiceFn, TRows } from "src/types/generics";

export namespace AppAccountService {
    
    export namespace GetAllAccountDTO {
        export type Args = GetAllArgs<Account>
        export type Result = TRows<Account>;
        export type Handler = ServiceFn<Args, Promise<Result>>;
    }

    export namespace Create {
        export type Args = {
            data: {
                name: string;
                email: string;
            };
            file?: any;
          }
        export type Result = Account | IError;
        export type Handler = ServiceFn<Args, Promise<Result>>;
    }

    export interface IAccountService {
        findAndCountAll: AppAccountService.GetAllAccountDTO.Handler;
        create: AppAccountService.Create.Handler;
    }
}


