import express from 'express';
import { VerlofService } from '../business/service/verlofService';

export class VerlofController {
    constructor(private verlofService: VerlofService) {}

    public async getVerlofData(req: express.Request, res: express.Response): Promise<void> {
        try {
            const verlofData = await this.verlofService.getVerlofData();
            res.status(200).json(verlofData);
        } catch (error) {
            console.error('Error fetching verlof data:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    public async submitVerlofRequest(req: express.Request, res: express.Response): Promise<void> {
        const { captainEmail, startDate, endDate } = req.body;
        try {
            await this.verlofService.submitVerlofRequest(captainEmail, startDate, endDate);
            res.status(201).send('Verlof request submitted successfully');
        } catch (error) {
            console.error('Error submitting verlof request:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

initializeServer();

export default router;

}

