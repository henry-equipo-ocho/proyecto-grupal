import dotenv from 'dotenv';
import { Request } from 'express';
import User from '../models/User.models';
const nodemailer = require('nodemailer');

dotenv.config();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CREATOR,
        pass: process.env.PASS
    },
    tls: {
        rejectUnanthorized: false

    }
})

export const signUpService = async (req: Request): Promise<any> => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) throw new Error('User already exists');

        const newUser = new User(req.body);
        await newUser.save();

        var mailOptions = {
            from: ` "Verify your email" <${process.env.CREATOR}>`,
            to: newUser.email,
            subject: 'Verify your email',
            html: `<h2> ${newUser.name}! Thanks for registering on our site </h2>
                    <h4>Please verify your email to continue...</h4>
                    <a href="http://${req.headers.host}/signup/verify-email?id=${newUser.id}">Verify Your Email</a>`
        };

        // sending email
        await transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error)
            }
            else {
                console.log('Verification email is send to gmail account')
            }
        });

        // TODO: is it necessary to return the new user?
        return newUser;
    } catch (error: any) {
        throw error;
    }
};