const jobSkillsDataRoute = require('../../routes/jobSkillsData');
const occupationDataRoute = require('../../routes/occupationData');
// const app = requi
const chai = require('chai');
var assert = require('assert');
const chaiHttp = require('chai-http');
var { suite, test, describe, it } = require('mocha');

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

describe('Server', () => {
  it('welcome user to the API', done => {
    chai
      .request(jobSkillsDataRoute)
      .get('/')
      .end((err, res) => {
        // expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        expect(res.body.message).to.equals('On the Job Skills Data page');
        // expect(res.body)
        done();
      });
  });
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
