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
            const query = { userShouldExist: false }

            const res = await supertest(app)
                .post('/testsubject')
                .send(query)
                .expect(404);
        });

        it("should return 201 to successfully create a new user", async () => {
            const name = 'fulano';
            const query = { userShouldExist: true, name }

            const res = await supertest(app)
                .post('/testsubject')
                .send(query)
                .expect({ name }) // Return the name of created user
                .expect(201);
        });

        describe('given the subject does not exist', () => {

            it("should return a 404", async () => {
                const subjectId = 0;

                const res = await supertest(app).get(`/subject/0`).expect(404);
            });
        });
    });
});