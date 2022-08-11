import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export let AppDataSource: DataSource;

if (process.env.STATUS === 'test') {
    AppDataSource = new DataSource({
        name: 'default',
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [`${__dirname}/**/entities/*.{ts,js}`],
        migrations: [`${__dirname}/**/migrations/testmigrations/*.{ts,js}`],
        synchronize: true,
        // migrationsRun: true
    });
} else {
    AppDataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: port,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [`${__dirname}/**/entities/*.{ts,js}`],
        migrations: [`${__dirname}/**/migrations/development/*.{ts,js}`],
        // migrationsRun: true, // automatically run migrations before the tests
    });
}
