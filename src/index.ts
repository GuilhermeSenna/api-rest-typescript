import express from 'express';
import { InMemoryDatabase } from './data-source';
import { createServer } from './util/server'

const app = createServer()

const startServer = async () => {
    await InMemoryDatabase.initialize();
    console.log('Connected to the database!');

    app.listen(process.env.port);
    console.log('Server running on port:', process.env.port);
}

startServer();