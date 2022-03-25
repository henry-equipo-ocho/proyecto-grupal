import UserInterface from "../interfaces/User.interface";
import User from '../models/User.models';

export const getUserFavorites = async (userID: string): Promise<Array<Array<string>>> => {
    try {
        const query: any | null = await User.findById(userID, 'favActivities');
        if (!query) {
            throw new Error(`User (${userID}) not found`);
        }
        console.log(query);
        return query.favActivities;

    } catch (error) {
        throw error;
    }
}

export const addUserFavorite = async (userID: string, activityID: string, itineraryIndex: number | undefined): Promise<boolean> => {
    try {
        const user: UserInterface | null = await User.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }
        console.log(user);


        if (!itineraryIndex || itineraryIndex > user.favActivities.length - 1) {
            console.log("pushing to a");
            user.favActivities.push([activityID]);
        } else {
            console.log("pushing to a[a]");
            user.favActivities[itineraryIndex].push(activityID);
        }
        await user.save();

        return true;
    } catch (error) {
        throw error;
    }
}

export const deleteUserFavorite = async (userID: string, itineraryIndex:number, activityID: string): Promise<boolean> => {
    try {
        const user: UserInterface | null = await User.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }

        if(activityID) {
        let res = User.findByIdAndUpdate(
            userID, { $pull: { "favActivities.$": { _id: activityID } } },
            function (error, user) {
                if (error) {
                    throw error;
                }
                return true;
            });
            if (!res) {
                throw new Error(`User (${userID}) not found or activity (${activityID}) not found or itinerary (${itineraryIndex}) not found`);
            }
        } else {

        }
        return true;

    } catch (error) {
        throw error;
    }
}