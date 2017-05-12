var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('OverTime unit tests:', () => {
    it('Should create a OverTime instance', (done: Function) => {
        api.post('/over-times').send({
            date: 'Thu Apr 27 2017 12:52:13 GMT+0530 (+0530)',
            fromTime: 'Thu Apr 27 2017 12:52:13 GMT+0530 (+0530)',
            startTime: 'Thu Apr 27 2017 12:52:13 GMT+0530 (+0530)',
            endTime: 'Thu Apr 27 2017 12:52:13 GMT+0530 (+0530)'
        }).expect(200, done);
    });
});
