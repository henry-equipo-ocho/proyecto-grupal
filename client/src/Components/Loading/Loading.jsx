import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
    return (
        <div>
            <h1>Welcome, please wait</h1>

            <div id={style.fountainG}>
                <div id="fountainG_1" className={style.fountainG}></div>
                <div id="fountainG_2" className={style.fountainG}></div>
                <div id="fountainG_3" className={style.fountainG}></div>
                <div id="fountainG_4" className={style.fountainG}></div>
                <div id="fountainG_5" className={style.fountainG}></div>
                <div id="fountainG_6" className={style.fountainG}></div>
                <div id="fountainG_7" className={style.fountainG}></div>
                <div id="fountainG_8" className={style.fountainG}></div>
            </div>
        </div>
    );
};

export default Loading;
