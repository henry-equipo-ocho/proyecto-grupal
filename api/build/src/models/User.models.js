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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const itinerarySchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, 'Missing name attribute'] },
    activities: { type: [String], required: [true, 'Missing activities attribute'] }
});
const paymentSchema = new mongoose_1.default.Schema({
    id: { type: String, required: [true, 'Missing id attribute'] },
    status: { type: String, required: [true, 'Missing status attribute'] },
    description: { type: String, required: [true, 'Missing description attribute'] },
    tier: { type: Number, required: [true, 'Missing tier attribute'] },
}, {
    timestamps: true
});
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, 'Missing name attribute'] },
    surname: { type: String, required: [true, 'Missing surname attribute'] },
    email: { type: String, required: [true, 'Missing email attribute'], unique: true, lowercase: true, trim: true },
    country: { type: String, required: [true, 'Missing country attribute'] },
    password: { type: String, required: [true, 'Missing password attribute'] },
    role: { type: Number, required: [true, 'Missing role attribute'], default: 0 },
    favActivities: [itinerarySchema],
    payments: [paymentSchema],
    activeSubscription: { type: Boolean },
    subscriptionTier: { type: Number },
    isVerified: { type: Boolean, default: false }
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            user.password = hash;
            next();
        }
        catch (error) {
            // TODO: what could throw an error?
            throw error;
        }
    });
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
exports.default = mongoose_1.default.model('User', userSchema);
