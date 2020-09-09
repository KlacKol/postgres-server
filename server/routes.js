import mapGetAll from './controllers/map/getAll/mapGetAll';
import mapGetOne from './controllers/map/getOne/mapGetOne';
import mapUpdate from './controllers/map/Update/mapUpdate';
import mapPost from './controllers/map/addMarker/mapPost';
import mapDeleteOne from './controllers/map/deleteOne/mapDeleteOne';
import mapDeleteAll from './controllers/map/deleteAll/mapDeleteAll';
import mapFakeDataGenerate from './controllers/map/fakeDataGenerate/mapFakeDataGenerate';
import mapSearchDate from './controllers/map/searchOnDate/mapSearchDate';
import registrationUser from './controllers/user/registration/registration';
import loginUser from './controllers/user/login/login';
import refreshToken from './controllers/user/refreshToken/refreshToken';
import deleteRefreshToken from './controllers/user/deleteRefreshToken/deleteRefreshToken';

const connect = (app) => {
    app.use('/map', [
        mapGetAll,
        mapGetOne,
        mapUpdate,
        mapPost,
        mapDeleteOne,
        mapDeleteAll,
        mapFakeDataGenerate,
        mapSearchDate
    ]);
    app.use('/auth', [
        registrationUser,
        loginUser,
        refreshToken,
        deleteRefreshToken
    ])
};

export default connect;