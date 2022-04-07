import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useAxiosPrivate } from "../../Auth/useAxiosPrivate";
import "./loader.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Estadisticas() {
    const axiosPrivate = useAxiosPrivate();

    const [totalUsers, setTotalUsers] = useState(0);
    const [usersVer, setUsersVer] = useState(0);
    const [usersNotVer, setUsersNotVer] = useState(0);

    const [totalActivities, setTotalActivities] = useState(0);
    const [activitiesBusiness, setActivitiesBusiness] = useState(0);
    const [activitiesAmadeus, setActivitiesAmadeus] = useState(0);

    const [totalBusiness, setTotalBusiness] = useState(0);
    const [businessBasic, setBusinessBasic] = useState(0);
    const [businessPro, setBusinessPro] = useState(0);
    const [businessPremium, setBusinessPremium] = useState(0);

    const [loadUsers, setLoadUsers] = useState(true);
    const [loadActivities, setLoadActivities] = useState(true);
    const [loadBusiness, setLoadBusiness] = useState(true);

    const dataUsers = {
        labels: ["Verified users", "Unverified users"],
        datasets: [
            {
                label: "# of users",
                data: [usersVer, usersNotVer],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const dataActivities = {
        labels: ["Businesses' activities", "Third-party activities"],
        datasets: [
            {
                label: "# of activities",
                data: [activitiesBusiness, activitiesAmadeus],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const dataBusiness = {
        labels: ["Business Basic", "Business Standard", "Business Premium"],
        datasets: [
            {
                label: "# of business",
                data: [businessBasic, businessPro, businessPremium],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 233, 210, 0.2)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 171, 87, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const cargarUsers = async () => {
        try {
            const datos = await axiosPrivate.get("/admin/users");
            setTotalUsers(datos.data.data.length);
            setUsersVer(
                datos.data.data.filter((user) => user.isVerified).length
            );
            setUsersNotVer(
                datos.data.data.filter((user) => !user.isVerified).length
            );
            setLoadUsers(false);
        } catch (e) {
            console.log(e);
        }
    };

    const cargarActivities = async () => {
        try {
            const datos = await axiosPrivate.get("/admin/activities");
            setTotalActivities([...datos.data.data[0], ...datos.data.data[1], ...datos.data.data[2], ...datos.data.data[3]].length);
            setActivitiesBusiness(
                [...datos.data.data[0], ...datos.data.data[1], ...datos.data.data[2], ...datos.data.data[3]].filter(
                    (act) => !act.booking.includes("https://b2c.mla.cloud/")
                ).length
            );
            setActivitiesAmadeus(
                [...datos.data.data[0], ...datos.data.data[1], ...datos.data.data[2], ...datos.data.data[3]].filter((act) =>
                    act.booking.includes("https://b2c.mla.cloud/")
                ).length
            );
            setLoadActivities(false);
        } catch (e) {
            console.log(e);
        }
    };

    const cargarBusiness = async () => {
        try {
            const datos = await axiosPrivate.get("/admin/users");
            setTotalBusiness(
                datos.data.data.filter((busi) => busi.role === 1).length
            );
            setBusinessBasic(
                datos.data.data.filter(
                    (busi) =>
                        busi.role === 1 &&
                        busi.payments[busi.payments.length - 1].tier === 1
                ).length
            );
            setBusinessPro(
                datos.data.data.filter(
                    (busi) =>
                        busi.role === 1 &&
                        busi.payments[busi.payments.length - 1].tier === 2
                ).length
            );
            setBusinessPremium(
                datos.data.data.filter(
                    (busi) =>
                        busi.role === 1 &&
                        busi.payments[busi.payments.length - 1].tier === 3
                ).length
            );
            setLoadBusiness(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        cargarUsers();
        cargarActivities();
        cargarBusiness();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <center>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "30px",
                    background: "white",
                    margin: "10px",
                    borderRadius: "5px",
                }}
            >
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Statistics Dashboard
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ width: "25vw" }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Users
                        </Typography>
                        {!loadUsers ? (
                            <Box>
                                <Pie data={dataUsers} />
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Total users: {totalUsers}
                                </Typography>
                            </Box>
                        ) : (
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        )}
                    </Box>
                    <Box sx={{ width: "25vw" }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Activities
                        </Typography>
                        {!loadActivities ? (
                            <Box>
                                <Pie data={dataActivities} />
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Total activities: {totalActivities}
                                </Typography>
                            </Box>
                        ) : (
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        )}
                    </Box>
                    <Box sx={{ width: "25vw" }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Business
                        </Typography>
                        {!loadBusiness ? (
                            <Box>
                                <Pie data={dataBusiness} />
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Total business: {totalBusiness}
                                </Typography>
                            </Box>
                        ) : (
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        )}
                    </Box>
                </Box>
            </Container>
        </center>
    );
}
