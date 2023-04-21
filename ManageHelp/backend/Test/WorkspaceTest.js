//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let workspace = require('../models/workspaceModel');
const Workspace = require('../models/workspaceModel');
const User = require('../models/userModel')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
/*
    Test Conditions:
        - workspace1 should not be in the database
        - TestUser should not be in the database
        - ssharan31@gmail.com should be a part of Testing workspace
*/
//Every time before running npm test: remove workspace1, remove TestUser, and re-add ssharan31 to the Testing workspace with join code 0987
describe('Workspaces', () => {

    //Test the GET Route
    describe('/GET Workspaces', () => {
        it ('it should get all the workspaces', (done) => {
            chai.request(server)
                .get('/api/workspaces')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwNjdhY2U1ZjE0MTY1YjllNDNlZjkiLCJpYXQiOjE2ODIwMzEzMTQsImV4cCI6MTY4MjExNzcxNH0.U-OOLsatAf4gUcbNKrx4PACHuGyokqVzW-AOqtqcg_Q')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
                });
        })
    })
})
//Tests Transfer User
describe("Transfer Workspace", () => {
    //Create Dummy Stuff
    beforeEach( (done) => {

        Workspace.remove({joinCode: 1031}, (err) => { 
            done();           
        });
        /*
        Workspace.removeUser({email: 'TestUser@gmail.com'}, (err) => {
            done()
        });
        */
       /*
        User.remove({password: 'password'}, (err) => { 
            done();           
        });
        */
        workspace1 = Workspace.create({
            companyName: 'workspace1',
            joinCode: '1031',
            owner_id: 'someUserId',
            employee_list: [],
            manager_list: []
        }); 
        user =  User.create({
            name: 'TestUser',
            email: 'TestUser@gmail.com',
            password: 'password',
            workspaces: [workspace1._id]
        });
        
    })
    //Test Join
    describe('/Join Workspace by Email', () => {
        let user_info = {
            join_code:"7890",
            user_email:"TestUser@gmail.com"
        }
        it ('it should add a user to a given workspace by email address', (done) => {
            chai.request(server)
                .patch('/api/workspaces/4321/transfer')
                .send(user_info)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwNjdhY2U1ZjE0MTY1YjllNDNlZjkiLCJpYXQiOjE2ODIwMzEzMTQsImV4cCI6MTY4MjExNzcxNH0.U-OOLsatAf4gUcbNKrx4PACHuGyokqVzW-AOqtqcg_Q')
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
        })
    })

    //Test Remove
    
    describe('/Remove user', () => {
        let user_info = {
            email: "ssharan31@gmail.com"
        }
        it ('it should remove a given user from a workspace', (done) => {
            chai.request(server)
            .delete('/api/workspaces/remove/644167973f30a97616b1c336')
            .send(user_info)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwNjdhY2U1ZjE0MTY1YjllNDNlZjkiLCJpYXQiOjE2ODIwMzEzMTQsImV4cCI6MTY4MjExNzcxNH0.U-OOLsatAf4gUcbNKrx4PACHuGyokqVzW-AOqtqcg_Q')
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
        })
    })

    afterEach ( (done) => {
        Workspace.remove({joinCode: 1031}, (err) => { 
            done();           
        });
        User.remove({email: 'TestUser@gmail.com'}, (err) => {
            done();
        });
    })
    
})






    
  
    