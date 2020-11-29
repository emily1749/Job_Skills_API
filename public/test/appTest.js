// const jobSkillsDataRoute = app.use(require('../../routes/jobSkillsData'));
const occupationDataRoute = require('../../routes/occupationData');
// app.use('/occupationData', occupationDataRoute);
// const { retrieveSalaryData } = require('../lib/helpers');

const app = require('../../app');
const chai = require('chai');
var assert = require('assert');
const chaiHttp = require('chai-http');
var { suite, test, describe, it } = require('mocha');

// const app = express();
const expect = chai.expect;
chai.use(chaiHttp);

// describe('JOb Skills API', () => {
//   it('Should return status 200', async () => {
//     let res = await chai.request(occupationDataRoute);
//     //   .get('/front-end-developer');

//     expect(res.status).to.equal(200);
//     done();
//   });
// });

// describe('Server', () => {
//   it('welcome user to the API', done => {
//     chai
//       .request(jobSkillsDataRoute)
//       .get('/')
//       .end((err, res) => {
//         // expect(res).to.have.status(200);
//         expect(res.body.status).to.equals('success');
//         expect(res.body.message).to.equals('On the Job Skills Data page');
//         // expect(res.body)
//         done();
//       });
//   });
// });

describe('Server', () => {
  it('welcome user to the API', done => {
    chai
      .request('http://localhost:5000')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // expect(res.body.status).to.equals('success');
        // expect(res.body.message).to.equals('On the Job Skills Data page');
        // expect(res.body)
        done();
      });
  });
});

// test("retrieve occupation data ", async function(){
//     let
// })
describe('Job SKills', () => {
  it('welcome user to thee Job Skills Data', done => {
    chai
      //   .request(jobSkillsDataRoute)
      .request('http://localhost:5000/jobSkillsData')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        expect(res.body.message).to.equals('On the Job Skills Data page');
        // expect(res.body)
        done();
      });
  });
  //   it()
});

describe('Occupation Data', () => {
  it('Welcome user to thee Occupation Data', done => {
    chai
      .request('http://localhost:5000/occupationData')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        expect(res.body.message).to.equals('On the Occupation Data page');
        // expect(res.body)
        done();
      });
  });
  it('Retrieve front end developer data', done => {
    chai
      .request('http://localhost:5000/occupationData')
      .get('/front-end-developer')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res)
          .to.have.nested.property('body[0]')
          .that.includes.all.keys([
            //   '0',
            'occupation',
            'averageBaseSalary',
            'percentSatisfied',
            'benefits1',
            'benefits2',
            'benefits3',
            'benefits4',
            'benefits5',
          ]);

        // expect(res.body).to.have.lengthOf(1);
        // expect(res)
        // expect(res.body.message).to.equals('On the Occupation Data page');
        // expect(res.body)
        done();
      });
  });
  it('Check the api without valid occupation data', done => {
    chai
      .request('http://localhost:5000/occupationData')
      .get('/fake-test')
      .end((err, res) => {
        expect(res).to.have.status(401);
        // expect(res).to.be.json;
        // expect(res.body).to.equals('front-end-developer');
        // expect(res.body.message).to.equals('On the Occupation Data page');
        // expect(res.body)
        done();
      });
  });
  // it("tests the endpoint and returns data", done=>{
  //     const response = await
  // }
});

function add(x, y, z) {
  return x + y === z;
}

suite('addition', function() {
  test('adding 2+2 is 4', function() {
    assert(true === add(2, 2, 4));
  });
  test('adding 2+4 is 4', function() {
    assert(false === add(2, 4, 4));
  });
});

// describe("Testing the Job API", () => {
//     it ('tests the base route and returns true for status', async() =>{
//         const resposne = await
//     })
// })
