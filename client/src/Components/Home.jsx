import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActivityCard from "./ActivityCard";
import ActivityDetail from "./ActivityDetail";
import "./Css/ActivityCard.css";
import "./Css/Home.css";
import Filter from "./Filter";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import {
    getActivities,
    getCities,
    getCountries,
    setLoading,
} from "./Redux/Actions/actions";
import SearchBarCopy from "./SearchBar/SearchBarCopy";

export default function Home() {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState(null);
    const [detail, setDetail] = useState(null);
    const activities = useSelector((state) => state.allActivities);
    const loading = useSelector((state) => state.loading);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfFirstActivity = (currentPage - 1) * 10;
    const currentActivities = activities[3]?.slice(
        indexOfFirstActivity,
        indexOfFirstActivity + 12
    );

    useEffect(() => dispatch(getActivities()), [dispatch]);
    useEffect(() => dispatch(getCountries()), [dispatch]);
    useEffect(() => dispatch(getCities()), [dispatch]);
    useEffect(() => {
        return activities.length
            ? dispatch(setLoading(false))
            : dispatch(setLoading(true));
    }, [activities, dispatch]);

    return (
        <div className="page">
            <NavBar handleLoginForm={setLoginForm} />

            <div className="searchImage">
                <div className="searchBarContainer">
                    <SearchBarCopy />
                </div>
            </div>

            <div className="bodyContainer">
                <div className="filter">
                    <Filter handleChangeCurrentPage={setCurrentPage} />
                </div>

                {loading ? (
                    <center>
                        <p className="loader" style={{ fontSize: "50px" }}></p>
                    </center>
                ) : (
                    <>
                        <div
                            className={`${
                                activities[0]?.length > 0 ? "tier1" : null
                            }`}
                        >
                        {activities[0]?.length > 0 ? <div>
                                <h1> Top activities</h1>
                            </div> : null}
                            
                            {activities[0]?.length > 0 ? (
                                
                                <div className="cardsDisplay">
                                    <div className="cardsContainer">
                                        {activities[0].map((a) => (
                                            <ActivityCard
                                                handleDetail={() =>
                                                    setDetail(a)
                                                }
                                                nombre={a.name}
                                                imagen={a.picture}
                                                id={a._id}
                                                key={a._id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : activities[0] === undefined ? (
                                <p
                                    className="loader"
                                    style={{ fontSize: "50px" }}
                                >
                                   
                                </p>
                            ) : null}
                        </div>

                        <div
                            className={`${
                                activities[1]?.length > 0 ? "tier2" : null
                            }`}
                        >
                            {activities[1]?.length > 0 ? <div>
                                <h1> Latest recommendations</h1>
                            </div> : null}
                            
                            {activities[1]?.length > 0 ? (
                                <div className="cardsDisplay">
                                    <div className="cardsContainer">
                                        {activities[1].map((a) => (
                                            <ActivityCard
                                                handleDetail={() =>
                                                    setDetail(a)
                                                }
                                                nombre={a.name}
                                                imagen={a.picture}
                                                id={a._id}
                                                key={a._id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : activities[1] === undefined ? (
                                <p
                                    className="loader"
                                    style={{ fontSize: "50px" }}
                                >
                                    {" "}
                                </p>
                            ) : null}
                        </div>

                        <div
                            className={`${
                                activities[2]?.length > 0 ? "tier3" : null
                            }`}
                        >
                            {activities[2]?.length > 0 ? <div>
                                <h1> Latest news</h1>
                            </div> : null}
                            {activities[2]?.length > 0 ? (
                                <div className="cardsDisplay">
                                    <div className="cardsContainer">
                                        {activities[2].map((a) => (
                                            <ActivityCard
                                                handleDetail={() =>
                                                    setDetail(a)
                                                }
                                                nombre={a.name}
                                                imagen={a.picture}
                                                id={a._id}
                                                key={a._id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : activities[2] === undefined ? (
                                <p
                                    className="loader"
                                    style={{ fontSize: "50px" }}
                                >
                                    {" "}
                                </p>
                            ) : null}
                        </div>

                        <div className="cardsDisplay">
                            <div className="cardsContainer">
                                {currentActivities?.length ? (
                                    currentActivities?.map((a) => (
                                        <ActivityCard
                                            handleDetail={() => setDetail(a)}
                                            nombre={a.name}
                                            imagen={a.picture}
                                            id={a._id}
                                            key={a._id}
                                        />
                                    ))
                                ) : activities[2] === undefined ? (
                                    <p
                                        className="loader"
                                        style={{ fontSize: "50px" }}
                                    >
                                        {" "}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Pagination
                activitiesPerPage={10}
                allActivities={activities[3]?.length}
                paginado={(pageNumber) => setCurrentPage(pageNumber)}
            />
            {loginForm && (
                <LoginForm
                    activity={loginForm}
                    close={() => setLoginForm(null)}
                    abierto={true}
                />
            )}

            {detail && (
                <ActivityDetail
                    activity={detail}
                    close={() => setDetail(null)}
                />
            )}
            <Footer />
        </div>
    );
}
