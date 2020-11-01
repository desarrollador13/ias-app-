import express from 'express';
import routes from '../api';

export default ({ app }: { app: express.Application }) => {
    app.use('/api/v1', routes)
};