import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllActivities } from '../Redux/Actions/actions';

function SearchBar() {
   
    const dispatch = useDispatch(); 
         const server = "http://localhost:3001";

    const findActivities = async(e) => {
         try {
             const searchName = await axios.get(`${server}/activity?name=${e.target.value}`)
             dispatch(setAllActivities(searchName.data))
             
         } catch (error) {
             console.error(error)
         }
    }

  return (
    <form 
    className="input"
    type= "text"
    onChange={(e) => findActivities(e)}
    placeholder= "Search Activities">

    </form>
  )
}

export default SearchBar