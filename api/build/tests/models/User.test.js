"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const User_models_1 = __importDefault(require("../../src/models/User.models"));
describe('User model', () => {
    it("shouldn't accept an empty init", (done) => {
        let noDataUser = new User_models_1.default();
        noDataUser.validate((error) => {
            (0, chai_1.expect)(error.errors.name).to.exist;
            (0, chai_1.expect)(error.errors.surname).to.exist;
            (0, chai_1.expect)(error.errors.email).to.exist;
            (0, chai_1.expect)(error.errors.password).to.exist;
            (0, chai_1.expect)(error.errors.country).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty name", (done) => {
        let noNameUser = new User_models_1.default({
            "surname": "G",
            "email": "aeg@gmail.com",
            "password": "superpassword",
            "country": "Argentina"
        });
        noNameUser.validate((error) => {
            (0, chai_1.expect)(error.errors.name).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty surname", (done) => {
        let noSurnameUser = new User_models_1.default({
            "name": "Ale",
            "email": "aeg@gmail.com",
            "password": "superpassword",
            "country": "Argentina"
        });
        noSurnameUser.validate((error) => {
            (0, chai_1.expect)(error.errors.surname).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty email", (done) => {
        let noEmailUser = new User_models_1.default({
            "name": "Ale",
            "surname": "G",
            "password": "superpassword",
            "country": "Argentina"
        });
        noEmailUser.validate((error) => {
            (0, chai_1.expect)(error.errors.email).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty password", (done) => {
        let noPasswordUser = new User_models_1.default({
            "name": "Ale",
            "surname": "G",
            "email": "aeg@gmail.com",
            "country": "Argentina"
        });
        noPasswordUser.validate((error) => {
            (0, chai_1.expect)(error.errors.password).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty country", (done) => {
        let noCountryUser = new User_models_1.default({
            "name": "Ale",
            "surname": "G",
            "email": "aeg@gmail.com",
            "password": "superpassword"
        });
        noCountryUser.validate((error) => {
            (0, chai_1.expect)(error.errors.country).to.exist;
            done();
        });
    });
    it("should accept a valid user", (done) => {
        let validUser = new User_models_1.default({
            "name": "Ale",
            "surname": "G",
            "email": "aeg@gmail.com",
            "password": "superpassword",
            "country": "Argentina"
        });
        validUser.validate((error) => {
            (0, chai_1.expect)(error).to.be.undefined;
            (0, chai_1.expect)(validUser.name).to.be.equal("Ale");
            (0, chai_1.expect)(validUser.surname).to.be.equal("G");
            (0, chai_1.expect)(validUser.email).to.be.equal("aeg@gmail.com");
            (0, chai_1.expect)(validUser.password).to.be.equal("superpassword");
            (0, chai_1.expect)(validUser.country).to.be.equal("Argentina");
            (0, chai_1.expect)(validUser._id).to.not.be.undefined;
            done();
        });
    });
    it("should accept another valid user", (done) => {
        let anotherValidUser = new User_models_1.default({
            "name": "Fede",
            "surname": "L",
            "email": "fla@hotmail.com",
            "password": "megapassword",
            "country": "Argentina"
        });
        anotherValidUser.validate((error) => {
            (0, chai_1.expect)(error).to.be.undefined;
            (0, chai_1.expect)(anotherValidUser.name).to.be.equal("Fede");
            (0, chai_1.expect)(anotherValidUser.surname).to.be.equal("L");
            (0, chai_1.expect)(anotherValidUser.email).to.be.equal("fla@hotmail.com");
            (0, chai_1.expect)(anotherValidUser.password).to.be.equal("megapassword");
            (0, chai_1.expect)(anotherValidUser.country).to.be.equal("Argentina");
            (0, chai_1.expect)(anotherValidUser._id).to.not.be.undefined;
            done();
        });
    });
});
