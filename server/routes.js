import mapGetAll from './controllers/map/getAll/mapGetAll';
import mapGetMarkersById from './controllers/map/getMarkersById/mapGetMarkersById';
import mapUpdate from './controllers/map/Update/mapUpdate';
import mapPost from './controllers/map/addMarker/mapPost';
import mapDeleteOne from './controllers/map/deleteOne/mapDeleteOne';
import mapDeleteAll from './controllers/map/deleteAll/mapDeleteAll';
import mapFakeDataGenerate from './controllers/map/fakeDataGenerate/mapFakeDataGenerate';
import mapSearchDate from './controllers/map/searchOnDate/mapSearchDate';
import registrationUser from './controllers/auth/registration/registration';
import loginUser from './controllers/auth/login/login';
import refreshToken from './controllers/auth/refreshToken/refreshToken';
import deleteRefreshToken from './controllers/auth/deleteRefreshToken/deleteRefreshToken';
import getAllUsers from './controllers/user/getAllUsers/getAllUsers';
import removeUser from  './controllers/user/removeUser/removeUser';

const connect = (app) => {
    app.use('/map', [
        mapGetAll,
        mapGetMarkersById,
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
    ]);
    app.use('/admin', [
        getAllUsers,
        removeUser
    ])
};

export default connect;