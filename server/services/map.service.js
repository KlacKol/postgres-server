import {MapSchema} from '../models/Geo'
import faker from "faker";
import {insideBoundingBox} from "geolocation-utils";

export const mapGetAll = async () => {
    return MapSchema.findAll();
};

export const mapGetOne = async (id) => {
    return MapSchema.findByPk(id);
};

export const mapAdd = async (data) => {
    return MapSchema.create(data, {raw: true});
};

export const mapFakeDataGenerate = async () => {
    const data = [];

    for(let i = 0; i<100; i++) {
        let geo = new MapSchema({
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
            description: faker.lorem.words(10),
            date: faker.date.past(),
            userId: 1
        });
        data.push(geo.get());
    }

    return MapSchema.bulkCreate(data, {returning: true});
};

export const mapGetFilterDate = async (data) => {
    const allCoords = await MapSchema.findAll();
    const success = [];
    allCoords.forEach(item => {
        const filter = insideBoundingBox({lat: item.lat, lon: item.lng}, {topLeft: data.topLeft, bottomRight: data.bottomRight});
        const year = item.date.getFullYear();
        const valid = year >= data.date[0] && year <= data.date[1];
        filter && valid ? success.push(item) : false
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