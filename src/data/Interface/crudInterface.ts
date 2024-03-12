import { businessmodel } from "../../business/model/foo";

export interface crudInterface {
    readVerlofByCaptainEmail(captainEmail: string): any;
    createFoo(): string;
    readFoo(id:string):Promise<businessmodel.Foo | null>;
    updateFoo(): void;
    deleteFoo(): void;
}