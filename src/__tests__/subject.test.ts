import supertest from 'supertest'
import { createServer } from '../util/server'
import { AppDataSource } from '../data-source';

jest.useFakeTimers();

const app = createServer();



describe('subject', () => {

    beforeAll(async () => {
        // AppDataSource.initialize().then(() => {
        //     return app.listen(process.env.port);
        // });

        AppDataSource.initialize();
    });

    describe('get subject route', () => {
        describe('given the subject does not exist', () => {
            it("should return a 404", async () => {
                const subjectId = 0;

                const res = await supertest(app).get(`/subject/0`);
            });
        });
    });
});