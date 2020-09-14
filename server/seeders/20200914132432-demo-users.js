'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [
            {
                lat: 44.129325446537145,
                lng: 19.35375976562501,
                description: 'lorem ispyumad aasd a adsaaaadwq',
                date: '2017-01-01',
                userId: 1
            },
            {
                lat: 44.129325446537145,
                lng: 21.35375976562501,
                description: 'lorem ispyumad aasd a adsaaaadwq',
                date: '2015-01-01',
                userId: 1
            },
            {
                lat: 31.129325446537145,
                lng: 29.35375976562501,
                description: 'lorem ispyumad aasd a adsaaaadwq',
                date: '2011-01-01',
                userId: 1
            }
        ], {})
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
