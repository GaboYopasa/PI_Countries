import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./landing.module.css";

export default function Landing() {
    return(
        <div className={style.landingPage}>
            <h1 className={style.landing__title}>Welcome to our World</h1>
            <Link to="/home" >
                <button className={style.landing__button}>Travel</button>
            </Link>
        </div>
    );
};