import { Request, Response } from 'express';
import User from '../models/user.model';

export const signUp = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.lastname) {
        return res.status(400).send('Missing values');
    }

    const user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send('User already exists');
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).send(newUser);
}