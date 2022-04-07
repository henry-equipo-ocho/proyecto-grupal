import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAllActivities } from "../Redux/Actions/actions";
import "./SearchBar.css";

function SearchBarCopy() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    const findActivities = (input, e) => {
        e.preventDefault();
        dispatch(setAllActivities(input));
        setInput("");
    };

    return (
        <form onSubmit={(e) => findActivities(input, e)}>
            <input
                className="input"
                value={input}
                type="text"
                onChange={(e) => handleInput(e)}
                placeholder="  Search Activities..."
            ></input>

            <button type="submit" className="button">
                Search
            </button>
        </form>
    );
}

export default SearchBarCopy;
