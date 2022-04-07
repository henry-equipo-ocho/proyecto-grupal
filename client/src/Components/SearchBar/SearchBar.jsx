import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setAllActivities } from "../Redux/Actions/actions";
import "./SearchBar.css";

function SearchBar() {
    const dispatch = useDispatch();

    const handleChange = async (e) => {
        try {
            const searchName = await axios.get(
                `http://localhost:3001/activities/match/${e.target.value}`
            );

            dispatch(setAllActivities(searchName.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form>
            <input
                className="input"
                type="text"
                onChange={(e) => handleChange(e)}
                placeholder="Search Activities"
            ></input>

            <button type="submit" className="button">
                Search
            </button>
        </form>
    );
}

export default SearchBar;
