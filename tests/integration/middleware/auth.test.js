import appServer from '../../../index.js'
import { Genre } from '../../../models/genre.js';
import { User } from '../../../models/user.js';
import request from 'supertest';


describe('auth middleware', () => {
    let server;
    let token;

    const exec = async () => {
        return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }

    beforeEach(() => { 
        server = appServer; 

        token = new User().generateAuthToken();
    });

    afterEach(async () => { 
        await Genre.deleteMany({});
        await server.close(); 
    });


    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});