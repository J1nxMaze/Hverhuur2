import { VerlofData } from "./JSONObjects";
import { businessmodel } from "../business/model/foo";

export class SingletonVerlof {

    private static obj: SingletonVerlof | null = null;

    private constructor() {
    }

    public static initializer(): SingletonVerlof {
        if (SingletonVerlof.obj == null) {
            SingletonVerlof.obj = new SingletonVerlof();
        }
        return SingletonVerlof.obj!;
    }

    public createVerlof(verlofDatabaseRow: VerlofData): businessmodel.Verlof {
        const returnValue: businessmodel.Verlof = new businessmodel.Verlof(verlofDatabaseRow.id, verlofDatabaseRow.description);
        return returnValue;
    }

    public createVerlofs(verlofDatabaseRows: VerlofData[]): businessmodel.Verlof[] {
        const returnValueArray: businessmodel.Verlof[] = [];
        for (let i = 0; i < verlofDatabaseRows.length; i++) {
            const verlof: businessmodel.Verlof = new businessmodel.Verlof(verlofDatabaseRows[i].id, verlofDatabaseRows[i].description);
            returnValueArray.push(verlof);
        }
        return returnValueArray;
    }
}


