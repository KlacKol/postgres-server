import request from 'supertest';
import {app} from '../index';

describe('test history map', () => {
    let data = {}
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
            data = res.body
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
        it('should refresh token', async () => {
            const res = await request(app)
                .post('/auth/refresh')
                .send({
                    refreshToken: data.refreshToken
                });
            expect(res.statusCode).toEqual(200);
        });
        it('should delete refresh token', async () => {
            const res = await request(app)
                .delete('/auth/refresh/1')
            expect(res.statusCode).toEqual(204);
        });
    })
    describe('map', () => {
        it('should create a new marker', async () => {
            const res = await request(app)
                .post('/map/create')
                .auth(data.token, {type: 'bearer'})
                .send({
                    lat: 50.129325446537145,
                    lng: 36.35375976562501,
                    description: 'lorem ispyumad aasd a adsaaaadwq',
                    date: '2019-01-01',
                    userId: 1
                });
            expect(res.body).toEqual({
                    id: 1,
                    lat: 50.129325446537145,
                    lng: 36.35375976562501,
                    description: 'lorem ispyumad aasd a adsaaaadwq',
                    date: '2018-12-31T22:00:00.000Z',
                    userId: 1,
                    location: {
                        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
                        type: 'Point',
                        coordinates: [ 50.129325446537145, 36.35375976562501 ]
                    }
                }
            )
            expect(res.statusCode).toEqual(201);
        });
        it('should update a marker', async () => {
            const res = await request(app)
                .put('/map/1')
                .auth(data.token, {type: 'bearer'})
                .send({
                    lat: 50.129325446537145,
                    lng: 36.35375976562501,
                    description: 'update lorem ispyumad aasd a adsaaaadwq',
                    date: '1111-11-11',
                    userId: 1
                });
            expect(res.body).toEqual([1])
            expect(res.statusCode).toEqual(200);
        });
        it('should get one marker', async () => {
            const res = await request(app)
                .get('/map/1')
                .auth(data.token, {type: 'bearer'})
            expect(res.body).toEqual({
                    id: 1,
                    location: {
                        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
                        type: 'Point',
                        coordinates: [ 50.129325446537145, 36.35375976562501 ]
                    },
                    description: 'update lorem ispyumad aasd a adsaaaadwq',
                    date: '1111-11-11T00:00:00.000Z',
                    userId: 1
                }
            )
            expect(res.statusCode).toEqual(200);
        });
        it('should delete one marker', async () => {
            const res = await request(app)
                .delete('/map/1')
                .auth(data.token, {type: 'bearer'})
            expect(res.statusCode).toEqual(204);
        });
        it('should generate a new markers', async () => {
            const res = await request(app)
                .get('/map/generate/random')
                .auth(data.token, {type: 'bearer'})
            expect(res.body).toEqual(expect.any(Array));
            expect(res.statusCode).toEqual(201);
        });
        it('should get all markers', async () => {
            const res = await request(app)
                .get('/map')
                .auth(data.token, {type: 'bearer'})
            expect(res.body).toEqual(expect.any(Array));
            expect(res.statusCode).toEqual(200);
        });
        it('should filter marker of bounds', async () => {
            const res = await request(app)
                .post('/map/search')
                .auth(data.token, {type: 'bearer'})
                .send({
                    topRight: {
                        lat: 65.33005384928556,
                        lng: 137.46093750000003,
                    },
                    bottomLeft: {
                        lat: 18.14556931158313,
                        lng: -31.289062500000004,
                    },
                    date: '2019-01-01',
                });
            expect(res.body).toEqual(expect.any(Array))
            expect(res.statusCode).toEqual(200);
        });
        it('should delete all markers', async () => {
            const res = await request(app)
                .delete('/map/delete/all')
                .auth(data.token, {type: 'bearer'})
            expect(res.statusCode).toEqual(204);
        });
    })
    describe('user', () => {
        it('should get all users', async () => {
            const res = await request(app)
                .get('/admin/users')
                .auth(data.token, {type: 'bearer'})
            expect(res.body).toEqual(expect.any(Array));
            expect(res.statusCode).toEqual(200);
        });
        it('should delete user', async () => {
            const res = await request(app)
                .delete('/admin/users/qwe@qwe.qwe')
                .auth(data.token, {type: 'bearer'})
            expect(res.statusCode).toEqual(204);
        });
    })
})