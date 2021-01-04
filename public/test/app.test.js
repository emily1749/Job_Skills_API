const chai = require('chai');
const chaiHttp = require('chai-http');
var { describe, it } = require('mocha');

const expect = chai.expect;
chai.use(chaiHttp);

let route = 'http://jobdataapi.emlin.repl.co';
let jobSkillsRoute = 'http://jobdataapi.emlin.repl.co/jobSkillsData';
let occupationRoute = 'http://jobdataapi.emlin.repl.co/occupationData';

describe('Testing the API Server', () => {
  it('Tests the base route and returns status', done => {
    chai
      .request(route)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Testing the Job Skills endpoint', () => {
  it('Tests the Job Skills Data and returns status', done => {
    chai
      .request(jobSkillsRoute)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        expect(res.body.message).to.equals('On the Job Skills page');
        done();
      });
  });

  it("Test to get a location's job data", done => {
    chai
      .request(jobSkillsRoute)
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
      .request(jobSkillsRoute)
      .get('/test/test')
      .end((err, res) => {
        expect(res).to.not.have.status(200);
        done();
      });
  });
});

describe('Testing the Occupation Data endpoint', () => {
  it('Tests the Occupation Data and returns status', done => {
    chai
      .request(occupationRoute)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        expect(res.body.message).to.equals('On the Occupation Data page');
        done();
      });
  });

  it("Test to get an occupation's data", done => {
    chai
      .request(occupationRoute)
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
      .request(occupationRoute)
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
