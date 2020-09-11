import request from 'supertest';
import {app} from '../../../index';

describe('auth', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/auth/registration')
            .send({
                name: 'qwe',
                email: 'qwe@qwe.qwe',
                password: 'qwe',
                isAdmin: true
            });
        expect(res.statusCode).toEqual(201);
    });
    it('should login a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                name: 'qwe',
                password: 'qwe',
            });
        expect(res.statusCode).toEqual(200);
    });
})