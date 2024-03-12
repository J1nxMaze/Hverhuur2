import { businessmodel } from "../../business/model/verlofModel";
import { mysqlData } from "../models/verlofModel";
import { VerlofInterface } from "./verlofInterface";

export class MysqlVerlofInterface implements VerlofInterface {

    private verlof!: mysqlData.Verlof;
    
    public constructor() {
        this.verlof = new mysqlData.Verlof();
    }

    createVerlof(): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieves Verlof by captain's email
     * @param captainEmail - Email of the captain
     * @returns Verlof object if found, otherwise null
     */
    public async readVerlofByCaptainEmail(captainEmail: string): Promise<businessmodel.Verlof | null> {
        let returnValue: businessmodel.Verlof | null = null;
        returnValue = await this.verlof.getVerlofByCaptainEmail(captainEmail).then((result: businessmodel.Verlof | null) => {
            return result;
        });
        return returnValue;
    }

    updateVerlof(): void {
        throw new Error("Method not implemented.");
    }

    deleteVerlof(): void {
        throw new Error("Method not implemented.");
    }

}
