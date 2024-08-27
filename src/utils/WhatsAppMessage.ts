import { IError, ServiceFn } from "src/types/generics";


namespace SendCodeWhatsApp {
    export type Args = {
        data: {
            name: string;
            document: string
            limit: number;
            programId: number;
        };
        file?: any;
    }
    export type Result = void | IError;
    export type Handler = ServiceFn<Args, Promise<Result>>;

}

class Notifier {

    SendCodeWhatsApp: SendCodeWhatsApp.Handler = async ({
        
    }) => {

      }
}