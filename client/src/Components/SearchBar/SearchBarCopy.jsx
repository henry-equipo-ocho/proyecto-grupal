import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { getActivities, setAllActivities } from "../Redux/Actions/actions";
import "./SearchBar.css";

function SearchBarCopy() {

  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const findActivities = (input, e) => {
    e.preventDefault();
    e.target.value = "";
    dispatch(setAllActivities(input));
  };

  return (
    <form
      onSubmit={(e) => findActivities(input, e)}
    >
      <input
        className="input"
        type="text"
        onChange={(e) => handleInput(e)}
        placeholder="  Search Activities..."
      ></input>

      <button
        type="submit"
        className="button"
      >
        Search
      </button>


    </form>
  );
}

export default SearchBarCopy;
