import express from 'express';
import { VerlofService } from '../business/service/verlofService';

const router = express.Router();
const verlofService = new VerlofService();

// Endpoint to fetch verlof data
router.get('/verlof', async (req, res) => {
  try {
    const verlofData = await verlofService.getVerlofData();
    res.json(verlofData);
  } catch (error) {
    console.error('Error fetching verlof data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to submit verlof request
router.post('/verlof', async (req, res) => {
  const { captainEmail, startDate, endDate } = req.body;
  try {
    await verlofService.submitVerlofRequest(captainEmail, startDate, endDate);
    res.status(201).send('Verlof request submitted successfully');
  } catch (error) {
    console.error('Error submitting verlof request:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
