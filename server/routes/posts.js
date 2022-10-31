import express from 'express';

const router = express.Router();

router.get('/', (req, rest) => {
    rest.send('THIS WORKS!');
});

export default router;