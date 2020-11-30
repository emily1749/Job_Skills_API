const chai = require('chai');
// var assert = require('assert');
const chaiHttp = require('chai-http');
var { describe, it } = require('mocha');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the API Server', () => {
  it('Tests the base route and returns status', done => {
    chai
      .request('http://localhost:5000')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Testing the Job Skills endpoint', () => {
  it('Tests the Job Skills Data and returns status', done => {
    // this.timeout(0);
    chai
      .request('http://localhost:5000/jobSkillsData')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        expect(res.body.message).to.equals('On the Job Skills page');
        done();
      });
  });

  it("Tests the endpoint to get a location's job data", done => {
    chai
      .request('http://localhost:5000/jobSkillsData')
      .get('/san+francisco/ca')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        // expect(res.body)
        //   //   .to.have.nested.property('body[0]')
        //   .to.have.keys([
        //     'Golang',
        //     'PHP',
        //     'Swift',
        //     'C#',
        //     'Python',
        //     'Ruby',
        //     'JavaScript',
        //     'TypeScript',
        //     'C++',
        //     'Java',
        //   ]);
        done();
      });
  }).timeout(0);

  it('Tests the status for invalid location data', done => {
    chai
      .request('http://localhost:5000/jobSkillsData')
      .get('/test/test')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Testing the Occupation Data endpoint', () => {
  it('Tests the Occupation Data and returns status', done => {
    chai
      .request('http://localhost:5000/occupationData')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        expect(res.body.message).to.equals('On the Occupation Data page');
        done();
      });
  });

  it("Tests the endpoint to get an occupation's data", done => {
    chai
      .request('http://localhost:5000/occupationData')
      .get('/front-end-developer')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res)
          .to.have.nested.property('body[0]')
          .that.includes.all.keys([
            'occupation',
            'averageBaseSalary',
            'percentSatisfied',
            'benefits1',
            'benefits2',
            'benefits3',
            'benefits4',
            'benefits5',
          ]);
        done();
      });
  });

  it('Tests the status for invalid occupation data', done => {
    chai
      .request('http://localhost:5000/occupationData')
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
