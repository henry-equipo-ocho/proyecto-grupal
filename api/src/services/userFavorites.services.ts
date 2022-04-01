import UserInterface, { Itinerary } from "../interfaces/User.interface";
import User from '../models/User.models';

export const getUserFavorites = async (userID: string): Promise<Array<Itinerary>> => {
    try {
        const query: any | null = await User.findById(userID, 'favActivities');
        if (!query) {
            throw new Error(`User (${userID}) not found`);
        }
        return query.favActivities;

    } catch (error) {
        throw error;
    }
}

export const addUserFavorite = async (userID: string, activityID: string, itineraryName: string): Promise<boolean> => {
    try {
        const user: UserInterface | null = await User.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }

        let itineraryIndex = user.favActivities.findIndex((iti) => iti.name === itineraryName);
        if (itineraryIndex === -1) {
            user.favActivities.push(<Itinerary>({ name: itineraryName ? itineraryName : `it-${Date.now()}`, activities: [activityID] }));
        } else {
            if (user.favActivities[itineraryIndex].activities.includes(activityID)) {
                return false;
            }
            user.favActivities[itineraryIndex].activities.push(activityID);
        }
        user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
        await user.save();

        return true;
    } catch (error) {
        throw error;
    }
}

export const deleteUserFavorite = async (userID: string, itineraryName: string, activityID: string): Promise<boolean> => {
    try {
        const user: UserInterface | null = await User.findById(userID);
        if (!user) {
            throw new Error(`User (${userID}) not found`);
        }

        let itineraryIndex = user.favActivities.findIndex((iti) => iti.name === itineraryName);
        if (itineraryIndex === -1) {
            return false;
        }

        if (activityID !== undefined) {
            let filteredItinerary = user.favActivities[itineraryIndex].activities.filter((activity) => activity !== activityID);

            if (filteredItinerary.length === user.favActivities[itineraryIndex].activities.length) {
                return false;
            }
            if (filteredItinerary.length > 0) {
                user.favActivities[itineraryIndex].activities = filteredItinerary;
            } else {
                user.favActivities.splice(itineraryIndex, 1);
            }
        } else {
            user.favActivities.splice(itineraryIndex, 1);
        }

        user.markModified('anything'); // ? https://stackoverflow.com/a/52033372
        await user.save();
        return true;

    } catch (error) {
        throw error;
    }
}