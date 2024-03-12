import { Verlof } from "../business/model/verlofModel";
import { pool } from "../../util/database";
import { RowDataPacket } from "mysql2";

export class MysqlVerlofInterface {

    public async readVerlofByCaptainEmail(captainEmail: string): Promise<Verlof | null> {
        try {
            const query = 'SELECT * FROM `Verlof` WHERE Captain_Email = ?';
            const [rows] = await pool.promise().query<RowDataPacket[]>(query, [captainEmail]);
            
            if (rows && rows.length > 0) {
                const verlofData = rows[0];
                const verlof = new Verlof(verlofData.id, verlofData.start_date, verlofData.end_date, verlofData.timestamp, verlofData.captain_email);
                return verlof;
            }
            
            return null;
        } catch (error) {
            console.error('Error reading Verlof by Captain Email:', error);
            throw error;
        }
    }

    public async createVerlof(verlof: Verlof): Promise<void> {
        try {
            const query = 'INSERT INTO `Verlof` (start_date, end_date, timestamp, captain_email) VALUES (?, ?, ?, ?)';
            await pool.promise().query(query, [verlof.start_date, verlof.end_date, verlof.timestamp, verlof.captain_email]);
        } catch (error) {
            console.error('Error creating Verlof:', error);
            throw error;
        }
    }

    public async updateVerlof(verlof: Verlof): Promise<void> {
        try {
            const query = 'UPDATE `Verlof` SET start_date = ?, end_date = ?, timestamp = ? WHERE id = ?';
            await pool.promise().query(query, [verlof.start_date, verlof.end_date, verlof.timestamp, verlof.id]);
        } catch (error) {
            console.error('Error updating Verlof:', error);
            throw error;
        }
    }

    public async deleteVerlof(id: string): Promise<void> {
        try {
            const query = 'DELETE FROM `Verlof` WHERE id = ?';
            await pool.promise().query(query, [id]);
        } catch (error) {
            console.error('Error deleting Verlof:', error);
            throw error;
        }
    }

    // You can implement other methods similarly
}
