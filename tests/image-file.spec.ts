var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('ImageFile unit tests:', () => {
    it('Should create a ImageFile instance', (done: Function) => {
        api.post('/image-files').send({
            name: 'test',
            container: 'test',
            type: 'test',
            size: 12345
        }).expect(200, done);
    });
});
