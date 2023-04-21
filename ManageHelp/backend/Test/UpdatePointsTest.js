
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
const employeeDataModel = require("../models/employeeDataModel");
let should = chai.should();

chai.use(chaiHttp);
describe('Update Points', () => {
    //Test the updatePoints Route
    describe('/Update Points', () => {
        /*
        let points_info = User.create({
            email: "ssanjith25@gmail.com", 
            workspace_id: "644167973f30a97616b1c336", 
            points: 6
        })
        */
        it('it should update the points', (done) => {
            chai.request(server)
                .patch('api/employeedata/updatePoints')
                .send("ssanjith25@gmail.com","644167973f30a97616b1c336",7)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQxNjdiNTNmMzBhOTc2MTZiMWMzM2EiLCJpYXQiOjE2ODIwNDI0ODMsImV4cCI6MTY4MjEyODg4M30.ayS2Hw0T902agdoqmdPtMN1r4v61zDmY2MmWnvLrdt8')
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    done();
                });
        })
    })
})
