var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('userRole unit tests:', () => {
    it('Should create a userRole instance', (done: Function) => {
        api.post('/user-roles').send({}).expect(200, done);
    });
});
