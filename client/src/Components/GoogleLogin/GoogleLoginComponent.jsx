import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

// const CLIENT_ID =
//   "827529413912-celsdkun_YOUR_API_KEY_lsn28.apps.googleusercontent.com";

const GoogleLoginComponent = () => {
    const [loginData, setLoginData] = useState(
        localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData"))
            : null
    );

    const handleFailure = (result) => {
        alert(result);
    };

    const handleLogin = async (googleData) => {
        const res = await fetch("/signin/google", {
            method: "GET",
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        setLoginData(data);
        localStorage.setItem("loginData", JSON.stringify(data));
    };
    const handleLogout = () => {
        localStorage.removeItem("loginData");
        setLoginData(null);
    };
    
    return (
        <div className="app">
            {loginData ? (
                <GoogleLogout
                    clientId="587804658382-67beqpcr6n4gcifa39biirld993tsr7q.apps.googleusercontent.com"
                    buttonText={"Logout"}
                    onLogoutSuccess={handleLogout}
                ></GoogleLogout>
            ) : (
                <GoogleLogin
                    clientId="587804658382-67beqpcr6n4gcifa39biirld993tsr7q.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                />
            )}
        </div>
    );
};
export default GoogleLoginComponent;
