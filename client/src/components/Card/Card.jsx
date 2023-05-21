import React from "react";

export default function Card({ name, flag, continent }) {
    return (
        <div>
            <h2>{name}</h2>
            <img src={flag} alt="image not found" />
            <h4>Continent: {continent}</h4>
        </div>
    )
};