var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Employe unit tests:', () => {
    it('Should create a Employe instance', (done: Function) => {
        api.post('/employes').send({
            firstName: 'test',
            lastName: 'test',
            nic: 'test',
            uid: 'test',
            joinDate: 'Thu Apr 20 2017 12:50:16 GMT+0530 (+0530)',
            resignDate: 'Thu Apr 20 2017 12:50:16 GMT+0530 (+0530)',
            designation: 'test'
        }).expect(200, done);
    });
});
