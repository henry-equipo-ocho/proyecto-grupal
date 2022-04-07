import { useAuth0 } from "@auth0/auth0-react";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import React from "react";

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <Button
                color="inherit"
                variant="outlined"
                onClick={() => loginWithRedirect()}
                startIcon={<PersonIcon />}
            >
                Login
            </Button>
        </>
    );
}
