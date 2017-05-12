var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('userRoleMapping unit tests:', () => {
    it('Should create a userRoleMapping instance', (done: Function) => {
        api.post('/user-role-mappings').send({}).expect(200, done);
    });
});
