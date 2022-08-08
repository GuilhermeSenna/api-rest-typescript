import express from 'express';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.get('/', (req, res) => {
        return res.json('tudo certo');
    });

    return app.listen(process.env.port);
});