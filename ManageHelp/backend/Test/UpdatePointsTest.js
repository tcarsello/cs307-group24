
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let workspace = require('../models/workspaceModel');
const Workspace = require('../models/workspaceModel');
const User = require('../models/userModel')
const EmployeeData = require('../models/employeeDataModel')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Update Points', () => {
    //Test the updatePoints Route
    describe('/Update Points', () => {
        let points_info = {
            email: "ssanjith25@gmail.com",
            points: 5,
            workspace_id: '644167973f30a97616b1c336'

        }
        it('it should update the points', (done) => {
            chai.request(server)
                .patch('api/employeedata/updatePoints')
                .send(points_info)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwNjdhY2U1ZjE0MTY1YjllNDNlZjkiLCJpYXQiOjE2ODIwMzEzMTQsImV4cCI6MTY4MjExNzcxNH0.U-OOLsatAf4gUcbNKrx4PACHuGyokqVzW-AOqtqcg_Q')
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    done();
                });
        })
    })
})
