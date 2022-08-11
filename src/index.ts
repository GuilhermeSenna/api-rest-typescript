import express from 'express';
import { AppDataSource } from './data-source';
import { createServer } from './util/server'

const app = createServer()

const startServer = async () => {

    if (process.env.STATUS === 'test')
        throw new Error(`Change .env STATUS to 'development' or 'production'`)

    await AppDataSource.initialize();
    console.log('Connected to the database!');

    app.listen(process.env.port);
    console.log('Server running on port:', process.env.port);
}

startServer();