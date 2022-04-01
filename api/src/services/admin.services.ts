import User from '../models/User.models';
import Activity from '../models/Activity.models';

export const deleteUserService = async (id: string): Promise<any> => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user;
    } catch (e) {
        throw e;
    }
}

export const getAllUserService = async (): Promise<any> => {
    try {
        const users = await User.find();
        return users;
    } catch (e) {
        throw e;
    }
}

export const deleteActivityService = async (id: string): Promise<any> => {
    try {
        const activity = await Activity.findByIdAndDelete(id);
        return activity;
    } catch (e) {
        throw e;
    }
}