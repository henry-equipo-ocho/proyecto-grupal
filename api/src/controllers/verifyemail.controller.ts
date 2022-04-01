import { Request, Response } from 'express';
import User from '../models/User.models';


export const verifyEmail = async (req: Request, res: Response) => {

    try {
        const id = req.query.id;
        const user = await User.findById(id)

        if(user) {
            user.isVerified = true;
            await user.save();
            res.redirect('http://localhost:3000/home')  // crear ruta para signin en rl front
        } else {
            res.redirect('http://localhost:3000/register');
            console.log('email is not verified');
        }
        
    } catch (error) {
        console.log(error)
    }
}