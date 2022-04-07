import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import User from "../interfaces/User.interface";

const itinerarySchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Missing name attribute'] },
    activities: { type: [String], required: [true, 'Missing activities attribute'] }
});

const paymentSchema = new mongoose.Schema({
    id: { type: String, required: [true, 'Missing id attribute'] },
    status: { type: String, required: [true, 'Missing status attribute'] },
    description: { type: String, required: [true, 'Missing description attribute'] },
    tier: { type: Number, required: [true, 'Missing tier attribute'] },
    price: { type: Number, required: [true, 'Missing price attribute'] },
}, {
    timestamps: true
});

const userSchema = new mongoose.Schema<User>({
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

userSchema.pre<User>('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt: string | Error = await bcrypt.genSalt(10);
        const hash: string | Error = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        // TODO: what could throw an error?
        throw error;
    }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model<User>('User', userSchema);