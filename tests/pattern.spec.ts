var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('pattern unit tests:', () => {
    it('Should create a pattern instance', (done: Function) => {
        api.post('/patterns').send({
            name: 'test',
            desc: 'test'
        }).expect(200, done);
    });
});
