var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('target unit tests:', () => {
    it('Should create a target instance', (done: Function) => {
        api.post('/targets').send({}).expect(200, done);
    });
});
