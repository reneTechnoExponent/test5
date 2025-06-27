import { Router } from 'express';
import { getConnection } from '../../src/lib/database/connector';
import newsletterSchema from '../../src/lib/models/newsletter.model';

const router = Router();

router.use((req, res, next) => {
    try {
        req.dbConnection = getConnection();
        if (!req.dbConnection) {
            // Handle case where database is not available (development mode)
            console.warn("Database connection not available, using mock mode");
            req.dbConnection = null;
        }
        next();
    } catch (error) {
        console.error("Database connection failed:", (error as Error).message);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({ error: 'Failed to connect to the database.' }));
    }
});

router.post('/subscribe', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { email, source } = req.body;
        if (!email) {
        res.status(400).send(JSON.stringify({ error: 'Email is required.' }));
        return;
    }

    // Handle mock mode when database is not available
    if (!req.dbConnection) {
        res.status(201).send(JSON.stringify({ message: 'Successfully subscribed to the newsletter! (Mock mode)' }));
        return;
    }

    const Newsletter = req.dbConnection.model('Newsletter', newsletterSchema);
    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
        res.status(409).send(JSON.stringify({ error: 'This email address is already subscribed.' }));
        return;
    }

    const newSubscriber = new Newsletter({
      email,
      metadata: { source: source || 'website', ipAddress: req.ip, userAgent: req.get('user-agent') }
    });

    await newSubscriber.save();
    res.status(201).send(JSON.stringify({ message: 'Successfully subscribed to the newsletter!' }));

  } catch (error: any) {
    if (error.name === 'ValidationError') {
        res.status(400).send(JSON.stringify({ error: error.message }));
        return;
    }
    if (error.code === 11000) {
        res.status(409).send(JSON.stringify({ error: 'This email address is already subscribed.' }));
        return;
    }
    console.error('Newsletter subscription error:', error);
    res.status(500).send(JSON.stringify({ error: 'An internal server error occurred.' }));
  }
});

router.post('/unsubscribe', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { email } = req.body;
    if (!email) {
        res.status(400).send(JSON.stringify({ error: 'Email is required.' }));
        return;
    }

    if (!req.dbConnection) {

        res.status(200).send(JSON.stringify({ message: 'Successfully unsubscribed from the newsletter! (Mock mode)' }));
        return;
    }

    const Newsletter = req.dbConnection.model('Newsletter', newsletterSchema);
    const result = await Newsletter.updateOne(
      { email }, 
      { status: 'unsubscribed' }
    );

    if (result.matchedCount === 0) {
        res.status(404).send(JSON.stringify({ error: 'Email address not found.' }));
        return;
    }

    res.status(200).send(JSON.stringify({ message: 'Successfully unsubscribed from the newsletter.' }));

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).send(JSON.stringify({ error: 'An internal server error occurred.' }));
  }
});

export default router;