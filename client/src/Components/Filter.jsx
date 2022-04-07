import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./Css/Filter.css";
import { getActivities, orderActivitiesByPrice } from "./Redux/Actions/actions";

export default function Filter({ handleChangeCurrentPage }) {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const cities = useSelector((state) => state.cities);
    const [input, setInput] = useState({
        country: "",
        city: "",
        type: "",
    });
    const citys = cities.filter((p) => p.country === input.country);

    function handleCountries(e) {
        setInput({
            ...input,
            country: e.target.value,
        });
    }

    function handleCities(e) {
        setInput({
            ...input,
            city: e.target.value,
        });
    }

    function handleOrderPrice(e) {
        setInput({
            ...input,
            type: e.target.value,
        });
    }

    function handlseSumbit() {
        if (!input.country && !input.city) {
            Swal.fire({
                title: "Sorry!",
                text: "There is nothing to filter",
                icon: "info",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });
        } else {
            dispatch(orderActivitiesByPrice(input));
            setInput({
                country: "",
                city: "",
                type: "",
            });
            handleChangeCurrentPage(1);
        }
    }
    function handleHome(e) {
        dispatch(getActivities());
    }

    return (
        <div className="filterContainer">
            <button className="filterButton" onClick={(e) => handleHome(e)}>
                Reset
            </button>
            <div>
                <label>Select Country: </label>
                <select
                    value={input.country}
                    onChange={(e) => handleCountries(e)}
                >
                    <option value=""></option>
                    {countries?.map((c) => (
                        <option value={c.name} key={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Select City: </label>
                <select value={input.city} onChange={(e) => handleCities(e)}>
                    <option value=""></option>
                    {citys?.map((c) => (
                        <option value={c.name} key={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Price: </label>
                <select
                    value={input.type}
                    onChange={(e) => handleOrderPrice(e)}
                >
                    <option value="Nada"></option>
                    <option value="Ascendent">Lowest price first</option>
                    <option value="Descendent">Highest price first</option>
                </select>
            </div>
            <button
                type="Submit"
                className="filterButton"
                onClick={(e) => handlseSumbit(e)}
            >
                Filter
            </button>
        </div>
    );
}
