import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserInterface from '../interfaces/User.interface';
import User from '../models/User.models';
const nodemailer = require('nodemailer') ;

dotenv.config();

export const getUserService = async (email: string): Promise<any> => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw error
    }
};

export const matchUserPasswordService = async (user: UserInterface, password: string): Promise<boolean> => {
    try {
        const match: boolean = await user.comparePassword(password);
        return match;
    } catch (error) {
        throw error
    }
};

export const createUserTokenService = (user: UserInterface): string => {
    return jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET as string, {
        expiresIn: '15m'
    })
};

export const createRefreshTokenService = (user: UserInterface): string => {
    return jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: '7d'
    })
};



export const sendResetPasswordEmailService = async (email: string, token: string): Promise<any> => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CREATOR,
            pass: process.env.PASS
        },
        tls: {
            rejectUnanthorized: false
        }
    });

    const mailOptions = {
        from: process.env.CREATOR,
        to: email,
        subject: 'Reset Password',
        html: `<p>You requested a password reset. Please click on the link below to reset your password.</p>
        <a href='http://localhost:3000/reset-password?token=${token}'>http://localhost:3000/reset-password</a>
        `
    }
    
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
}