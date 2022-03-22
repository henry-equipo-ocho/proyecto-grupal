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
});
