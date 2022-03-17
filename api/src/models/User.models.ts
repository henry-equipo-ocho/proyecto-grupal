import mongoose from "mongoose";
import User from "../interfaces/User.interface";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: [true, 'Missing name attribute'] },
    surname: { type: String, required: [true, 'Missing surname attribute'] },
    email: { type: String, required: [true, 'Missing email attribute'], unique: true, lowercase: true, trim: true },
    country: { type: String, required: [true, 'Missing country attribute'] },
    password: { type: String, required: [true, 'Missing password attribute'] },
    role: { type: Number, required: [true, 'Missing role attribute'], default: 0 },
});

userSchema.pre<User>('save', async function(next) {
    const user = this;

    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model<User>('User', userSchema);