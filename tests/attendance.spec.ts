var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Attendance unit tests:', () => {
    it('Should create a Attendance instance', (done: Function) => {
        api.post('/attendances').send({
            uid: 'test',
            name: 'test',
            dateTime: 'Thu Apr 20 2017 12:10:48 GMT+0530 (+0530)'
        }).expect(200, done);
    });
});
