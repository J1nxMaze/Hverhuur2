import { businessmodel } from "../../business/model/verlofModel";

export interface VerlofInterface {
    readVerlofByCaptainEmail(captainEmail: string): Promise<businessmodel.Verlof | null>;
    createVerlof(): string;
    updateVerlof(): void;
    deleteVerlof(): void;
}
