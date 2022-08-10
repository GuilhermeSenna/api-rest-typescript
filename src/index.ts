import express from 'express';
import { AppDataSource } from './data-source';
import { createServer } from './util/server'

const app = createServer()

AppDataSource.initialize().then(() => {
    return app.listen(process.env.port);
});