"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityByNameService = exports.getCountryByNameService = exports.saveCountryService = exports.saveCityService = exports.getCountriesService = exports.getCitiesService = void 0;
const City_models_1 = __importDefault(require("../models/City.models"));
const Country_models_1 = __importDefault(require("../models/Country.models"));
const getCitiesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield City_models_1.default.find();
        return cities;
    }
    catch (e) {
        throw e;
    }
});
exports.getCitiesService = getCitiesService;
const getCountriesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield Country_models_1.default.find();
        return cities;
    }
    catch (e) {
        throw e;
    }
});
exports.getCountriesService = getCountriesService;
const saveCityService = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCity = new City_models_1.default(city);
        yield newCity.save();
    }
    catch (e) {
        throw e;
    }
});
exports.saveCityService = saveCityService;
const saveCountryService = (country) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCountry = new Country_models_1.default(country);
        yield newCountry.save();
    }
    catch (e) {
        throw e;
    }
});
exports.saveCountryService = saveCountryService;
const getCountryByNameService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield Country_models_1.default.findOne({ name: name });
        return country;
    }
    catch (e) {
        throw e;
    }
});
exports.getCountryByNameService = getCountryByNameService;
const getCityByNameService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = yield City_models_1.default.findOne({ name: name });
        return city;
    }
    catch (e) {
        throw e;
    }
});
exports.getCityByNameService = getCityByNameService;
