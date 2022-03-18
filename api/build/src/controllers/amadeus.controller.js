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
Object.defineProperty(exports, "__esModule", { value: true });
exports.amadeusController = void 0;
const Amadeus = require('amadeus');
const amadeusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var amadeus = new Amadeus({
        clientId: 'OwaxoAtHCKCD5uateGJFssikTWyoHWNO',
        clientSecret: 'TGICwSH7oXB81kNQ'
    });
    const activities = yield amadeus.shopping.activities.get({
        latitude: -34.599722,
        longitude: -58.381944
    }).then((response) => response.data).catch((error) => error.code);
    res.send(activities);
});
exports.amadeusController = amadeusController;
