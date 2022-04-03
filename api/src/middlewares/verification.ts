import { Request, Response } from 'express';
import User from '../models/User.models';


const verifyEmail = async(req: Request, res: Response, next: any) => {

    try {
        const user = await User.findOne({ email: req.body.email});
        if(user?.isVerified) {
            next()
        }
        else{
            console.log('must verify the gmail account')
        }
    } catch (error) {
        console.log(error)
    }

};


export default verifyEmail