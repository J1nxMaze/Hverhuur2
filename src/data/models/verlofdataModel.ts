import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";
import { businessmodel } from "../../business/model/verlofModel";
import { SingletonVerlof } from "../../util/singletonVerlof";
import { VerlofData } from "../../util/JSONObjects";

export namespace mysqlData {

    export class Verlof {
        getVerlofByCaptainEmail(captainEmail: string) {
            throw new Error("Method not implemented.");
        }
        verlofs: businessmodel.Verlof[];

        constructor() {
            this.verlofs = [];
        }

        public async getVerlofById(id: string): Promise<businessmodel.Verlof | null> {

            let returnValue: businessmodel.Verlof | null = null;

            try {
                const [results, _field] = await pool.promise().execute<RowDataPacket[]>("SELECT * FROM `Verlof` where id = ?", [id]);
                returnValue = SingletonVerlof.initializer().createVerlof(results[0] as VerlofData);
            } catch (error) {
                console.log(error);
            }

            return returnValue;
        }

        public async getVerlofs(): Promise<businessmodel.Verlof[] | null> {

            let returnValueArray: businessmodel.Verlof[] | null = null;

            try {
                const [results, _field] = await pool.promise().execute<RowDataPacket[]>("SELECT * FROM `Verlof`");
                returnValueArray = SingletonVerlof.initializer().createVerlofs(results as VerlofData[]);
            } catch (error) {
                console.error(error);
            }
            return returnValueArray;
        }
    }
}
