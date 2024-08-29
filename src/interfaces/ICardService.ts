import { Card } from "@prisma/client";
import { GetAllArgs, IError, ServiceFn, TRows } from "../types/generics";

export namespace AppCardService {
  // export namespace GetAllCardDTO {
  //     export type Args = GetAllArgs<Card>
  //     export type Result = TRows<{
  //         id: string,
  //                 document: string,
  //                 name: string,
  //                 createdAt: Date,
  //     } | IError>;
  //     export type Handler = ServiceFn<Args, Promise<Result>>;
  // }

  export namespace Create {
    export type Args = {
      data: {
        name: string;
        document: string;
        limit: number;
        programId: number;
      };
      file?: any;
    };
    export type Result = Card | IError;
    export type Handler = ServiceFn<Args, Promise<Result>>;
  }

  // export namespace FindByDocument {
  //     export type Args = string
  //     export type Result = Card | null | IError;
  //     export type Handler = ServiceFn<Args, Promise<Result>>;
  // }

  export interface ICardService {
    // findAndCountAll: AppCardService.GetAllCardDTO.Handler;
    create: AppCardService.Create.Handler;
    // findByDocument: AppCardService.FindByDocument.Handler;
  }
}
