import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllActivities } from "../Redux/Actions/actions";
import "./SearchBar.css";

function SearchBar() {
  //const debounceRef = useRef();
 

  const [input, setInput]= useState('');

  // const onQueryChanged = (e) => {
  //   if (debounceRef.current) {
  //     clearTimeout(debounceRef.current);
  //   }
  //   debounceRef.current = setTimeout(() => {}, 350);
  // };

  const dispatch = useDispatch();
  //const server = "http://localhost:3001";

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const findActivities = async (e) => {
    e.preventDefault();
    dispatch(setAllActivities(input));
    setInput('');

    // try {
    //   //let searchName = await axios.post(`${server}/activities`)
    //   console.log("value:", value);
    //   onQueryChanged();
    //   let res = dispatch(setAllActivities(value));
    //   //let act = activities.data.filter(e => e.name.includes(value))
    //   console.log("res:", res);
    //   return res;
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <form 
      onSubmit={(e) => findActivities(e)}
    >
      <input
        className="input"
        type="text"
        onChange={(e) => handleChange(e)}
        placeholder="Search Activities"
      ></input>

      <button
        type="submit"
        
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
