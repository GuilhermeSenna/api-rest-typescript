import supertest from 'supertest'
import { createServer } from '../util/server'
import { AppDataSource } from '../data-source';

let app: unknown;
// Prevent warning about import
jest.useFakeTimers();

beforeAll(async () => {
    app = await createServer();

    if (process.env.STATUS !== 'test')
        throw new Error(`Change .env STATUS to 'test'`)

    await AppDataSource.initialize();
});

describe('subject', () => {
    describe('get subject route', () => {

        it("should return 404 to an non-existent user", async () => {
            await supertest(app)
                .get('/subject/1')
                .expect(404);
        });

        it("should return 201 to successfully create a new user", async () => {
            const name = 'fulano';
            const query = { name }

            await supertest(app)
                .post('/subject')
                .send(query)
                .expect({ ...query, id: 1 }) // Return the name of created user + ID
                .expect(201);
        });

        it("should return 200 to successfully get an user", async () => {
            await supertest(app)
                .get('/subject/1')
                .expect(200);
        });

        it("should return 200 to successfully remove user", async () => {
            await supertest(app)
                .delete('/subject/1')
                .expect(200);
        });

        it("should return 404 to try to delete an non-existent user", async () => {
            await supertest(app)
                .delete('/subject/1')
                .expect(404);
        });
    });
});