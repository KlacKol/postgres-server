// import request from 'supertest';
// import {app} from '../../../index';
// import {refreshTokenFormation, tokenFormation} from "../../services/auth.service";
//
// describe('map', () => {
//     const token = tokenFormation(1, 'qwe');
//     it('should create a new marker', async () => {
//         const res = await request(app)
//             .post('/map/create')
//             .set('Authorization', 'Bearer ' + token)
//             .send({
//                 lat: 50.129325446537145,
//                 lng: 36.35375976562501,
//                 description: 'lorem ispyumad aasd a adsaaaadwq',
//                 date: '2019-01-01',
//                 userId: 1
//             });
//         expect(res.statusCode).toEqual(201);
//     });
    // it('should delete 1 marker', async () => {
    //     const res = await request(app)
    //         .post('/auth/login')
    //         .send({
    //             name: 'qwe',
    //             password: 'qwe',
    //         });
    //     expect(res.statusCode).toEqual(200);
    // });
// })