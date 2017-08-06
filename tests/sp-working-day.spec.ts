var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('spWorkingDay unit tests:', () => {
    it('Should create a spWorkingDay instance', (done: Function) => {
        api.post('/sp-working-days').send({
            date: 'Sat Jun 10 2017 11:07:34 GMT+0530 (+0530)',
            startTime: 'Sat Jun 10 2017 11:07:34 GMT+0530 (+0530)',
            endTime: 'Sat Jun 10 2017 11:07:34 GMT+0530 (+0530)'
        }).expect(200, done);
    });
});
