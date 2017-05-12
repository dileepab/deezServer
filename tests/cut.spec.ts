var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('cut unit tests:', () => {
    it('Should create a cut instance', (done: Function) => {
        api.post('/cuts').send({
            noOfYards: 12345,
            yardPrice: 12345,
            noOfPieces: 12345,
            piecePrice: 12345,
            patternNo: 'test',
            deliverDate: 'Fri Apr 07 2017 13:11:38 GMT+0530 (+0530)'
        }).expect(200, done);
    });
});
