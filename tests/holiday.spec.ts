var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Holiday unit tests:', () => {
    it('Should create a Holiday instance', (done: Function) => {
        api.post('/holidays').send({
            date: 'Thu Apr 27 2017 12:48:45 GMT+0530 (+0530)'
        }).expect(200, done);
    });
});
