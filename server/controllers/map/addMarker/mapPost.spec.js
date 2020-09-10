import request from 'supertest';
import app from '../../../../index';

describe('MAP: POST', () => {
    it('should create a new marker', async () => {
        const res = await request(app)
            .post('/map/create')
            .send({
                lat: 50.02971567910523,
                lng: 36.11618041992188,
                description: 'bnkjhhjhjhjhjhjhjhjhjhjaaa',
                date: '2020-09-10',
                userId: '3'
            });
        expect(res.statusCode).toEqual(201);
    });
})