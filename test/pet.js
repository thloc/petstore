process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Pets', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET pets', () => {
        it('it should GET all the pets', (done) => {
            chai.request(server)
                .get('/pets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });
});

describe('/POST pets', () => {
    it('it should POST a pet', (done) => {
        let pet = {
            name: "Bug",
            status: "detected"
        };
        chai.request(server)
            .post('/pets')
            .send(pet)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pet successfully added!');
                res.body.pet.should.have.property('id');
                res.body.pet.should.have.property('name').eql(pet.name);
                res.body.pet.should.have.property('status').eql(pet.status);
                done();
            });
    });
    it('it should not POST a book without status field', (done) => {
        let pet = {
            name: "Bug"
        };
        chai.request(server)
            .post('/pets')
            .send(pet)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Pet successfully added!");
                done();
            });
    });
});