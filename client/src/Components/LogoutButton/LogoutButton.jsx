import { useAuth0 } from "@auth0/auth0-react";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";

export const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <div>
            <>
                <Link
                    to="/dashboard"
                    style={{
                        textDecoration: "none",
                        color: "white",
                        marginRight: "10px",
                    }}
                >
                    <Button
                        color="inherit"
                        variant="outlined"
                        startIcon={<PersonIcon />}
                    >
                        Dashboard
                    </Button>
                </Link>
                <Button
                    color="inherit"
                    variant="outlined"
                    //href="javascript:location.reload()"
                    onClick={() => logout()}
                    startIcon={<PersonIcon />}
                >
                    Logout
                </Button>
            </>
        </div>
    );
};
