var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('container unit tests:', () => {
    it('Should create a container instance', (done: Function) => {
        api.post('/containers').send({}).expect(200, done);
    });
});
