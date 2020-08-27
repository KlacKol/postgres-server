import {MapSchema} from '../models/Geo'
import faker from "faker";
import {insideBoundingBox} from "geolocation-utils";
import {Sequelize, QueryTypes} from "sequelize";

export const mapGetAll = async () => {
    return MapSchema.findAll();
};

export const mapGetOne = async (id) => {
    return MapSchema.findByPk(id);
};

export const mapAdd = async (data) => {
    data.location = {type: 'POINT', coordinates: [data.lat, data.lng]}
    return MapSchema.create(data, {raw: true});
};

export const mapFakeDataGenerate = async () => {
    const data = [];

    for(let i = 0; i<100; i++) {
        let geo = {
            location: {type: 'POINT', coordinates: [faker.address.latitude(), faker.address.longitude()]},
            description: faker.lorem.words(10),
            date: faker.date.past(),
            userId: 1
        };
        data.push(geo);
    }
    return MapSchema.bulkCreate(data, {returning: true});
};

export const mapGetFilterDate = async (data) => {
    // const a = data.f1.lat + ' ' + data.f1.lng;
    // const b = data.f2.lat + ' ' + data.f2.lng;
    // const c = data.f3.lat + ' ' + data.f3.lng;
    // const d = data.f4.lat + ' ' + data.f4.lng;
    // const e = data.f5.lat + ' ' + data.f5.lng;
    // const r = data.f6.lat + ' ' + data.f6.lng;
    // const t = data.f7.lat + ' ' + data.f7.lng;
    // const y = data.f8.lat + ' ' + data.f8.lng;
    // const u = data.f1.lat + ' ' + data.f1.lng;
    const a = data.topRight.lat + ' ' + data.topRight.lng;
    const b = data.bottomLeft.lat + ' ' + data.topRight.lng;
    const c = data.bottomLeft.lat + ' ' + data.bottomLeft.lng;
    const d = data.topRight.lat + ' ' + data.bottomLeft.lng;
    const e = data.topRight.lat + ' ' + data.topRight.lng;
    // const polygon = Sequelize.fn('ST_PolygonFromText', 'POLYGON((' + a + ',' + b + ',' + c + ',' + d + ',' + e + '))', 4326);
    const polygon = Sequelize.fn('ST_GeomFromText', 'POLYGON((' + a + ',' + b + ',' + c + ',' + d + ',' + e + '))', 4326);
    const allCoords = await MapSchema.findAll({
        where: Sequelize.fn('ST_Intersects', polygon, Sequelize.col('location'))
    });

    // const allCoords = await MapSchema.sequelize.query(
    //     "SELECT * FROM maps WHERE ST_Intersects(location, ST_GeomFromText('POLYGON((" + data.topLeft.lat + " " + data.topLeft.lng + "," + data.bottomRight.lat + " " + data.bottomRight.lng + "))')",
    //     {
    //             type: QueryTypes.SELECT
    //     }
    // );
    console.log(allCoords)
    const success = [];
    allCoords.forEach(item => {
        const lat = item.location.coordinates[0];
        const lon = item.location.coordinates[1];
        const year = item.date.getFullYear();
        const valid = year >= data.date[0] && year <= data.date[1];
        if (valid) {
            item.lat = lat;
            item.lng = lon;
            delete item.location
            success.push(item)
        }
    });
    return success;
};

export const mapDelete = async (id) => {
    return MapSchema.destroy({
        where: {
            id
        }
    });
};

export const mapDeleteAll = async () => {
    return MapSchema.destroy({
        where: {},
        truncate: true
    });
};

export const mapUpdate = async (id, data) => {
    return MapSchema.update(data, {
        where: {
            id
        }
    });
};