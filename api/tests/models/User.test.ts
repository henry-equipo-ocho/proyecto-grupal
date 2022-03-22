import { expect } from "chai";
import User from "../../src/models/User.models";

describe('User model', () => {
    it("shouldn't accept an empty init", (done) => {
        let noDataUser = new User();

        noDataUser.validate((error: any) => {
            expect(error.errors.name).to.exist;
            expect(error.errors.surname).to.exist;
            expect(error.errors.email).to.exist;
            expect(error.errors.password).to.exist;
            expect(error.errors.country).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty name", (done) => {
        let noNameUser = new User({
            "surname": "G",
            "email": "aeg@gmail.com",
            "password": "superpassword",
            "country": "Argentina"
        });

        noNameUser.validate((error: any) => {
            expect(error.errors.name).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty surname", (done) => {
        let noSurnameUser = new User({
            "name": "Ale",
            "email": "aeg@gmail.com",
            "password": "superpassword",
            "country": "Argentina"
        });

        noSurnameUser.validate((error: any) => {
            expect(error.errors.surname).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty email", (done) => {
        let noEmailUser = new User({
            "name": "Ale",
            "surname": "G",
            "password": "superpassword",
            "country": "Argentina"
        });

        noEmailUser.validate((error: any) => {
            expect(error.errors.email).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty password", (done) => {
        let noPasswordUser = new User({
            "name": "Ale",
            "surname": "G",
            "email": "aeg@gmail.com",
            "country": "Argentina"
        });

        noPasswordUser.validate((error: any) => {
            expect(error.errors.password).to.exist;
            done();
        });
    });
    it("shouldn't accept an empty country", (done) => {
        let noCountryUser = new User({
            "name": "Ale",
            "surname": "G",
            "email": "aeg@gmail.com",
            "password": "superpassword"
        });

        noCountryUser.validate((error: any) => {
            expect(error.errors.country).to.exist;
            done();
        });
    });
 })