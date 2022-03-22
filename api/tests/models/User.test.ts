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
    it("should accept a valid user", (done) => {
        let validUser = new User({
            "name": "Ale",
            "surname": "G",
            "email": "aeg@gmail.com",
            "password": "superpassword",
            "country": "Argentina"
        });

        validUser.validate((error: any) => {
            expect(error).to.be.undefined;
            expect(validUser.name).to.be.equal("Ale");
            expect(validUser.surname).to.be.equal("G");
            expect(validUser.email).to.be.equal("aeg@gmail.com");
            expect(validUser.password).to.be.equal("superpassword");
            expect(validUser.country).to.be.equal("Argentina");
            expect(validUser._id).to.not.be.undefined;
            done();
        });
    });
    it("should accept another valid user", (done) => {
        let anotherValidUser = new User({
            "name": "Fede",
            "surname": "L",
            "email": "fla@hotmail.com",
            "password": "megapassword",
            "country": "Argentina"
        });

        anotherValidUser.validate((error: any) => {
            expect(error).to.be.undefined;
            expect(anotherValidUser.name).to.be.equal("Fede");
            expect(anotherValidUser.surname).to.be.equal("L");
            expect(anotherValidUser.email).to.be.equal("fla@hotmail.com");
            expect(anotherValidUser.password).to.be.equal("megapassword");
            expect(anotherValidUser.country).to.be.equal("Argentina");
            expect(anotherValidUser._id).to.not.be.undefined;
            done();
        });
    });
})