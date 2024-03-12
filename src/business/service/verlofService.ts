import { crudInterface } from "../../data/Interface/crudInterface";
import { businessmodel } from "../model/verlofModel";

export namespace business {

    export class VerlofService {
        
        public constructor(private mysqlCrudInterface: crudInterface) {}

        /**
         * Function for getting Verlof object by captain email
         * @param captainEmail - Email of the captain
         * @returns Verlof (business model) object if found, otherwise null
         */
        public async getVerlofByCaptainEmail(captainEmail: string): Promise<businessmodel.Verlof | null> {
            let result: businessmodel.Verlof | null = await this.mysqlCrudInterface.readVerlofByCaptainEmail(captainEmail);
            return result;
        }
    }
}
