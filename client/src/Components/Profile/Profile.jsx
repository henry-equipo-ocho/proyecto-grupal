import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2> {user.name}</h2>
            </div>
        )
    );
};
