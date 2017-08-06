var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('file unit tests:', () => {
    it('Should create a file instance', (done: Function) => {
        api.post('/files').send({
            name: 'test',
            container: 'test',
            type: 'test',
            size: 'test'
        }).expect(200, done);
    });
});
