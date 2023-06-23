import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountriesByContinent, orderCountriesByName, orderCountriesByPopulation, filterByActivity, getActivities, orderByPopulation30M } from "../../redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import style from "./home.module.css";

export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const [, setOrder] = useState('');


    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterContinent = (event) => {
        dispatch(filterCountriesByContinent(event.target.value));
    };

    const handleFilterActivity = (ele) => {
        dispatch(filterByActivity(ele.target.value));
        setCurrentPage(1);
    }

    const handleSortByName = (event) => {
        event.preventDefault();
        dispatch(orderCountriesByName(event.target.value));
        setCurrentPage(1);
        setOrder(`Sorted ${event.target.value}`);
    };

    const handleSortByPopulation = (event) => {
        event.preventDefault();
        dispatch(orderCountriesByPopulation(event.target.value));
        setCurrentPage(1);
        setOrder(`Sorted ${event.target.value}`);
    };


    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);

    return (
        <div className={style.Home}>
            <Link to="/activity"><button>Create Activity</button></Link>
            <div>
                <select onChange={event => handleFilterContinent(event)}>
                    <option value="AllContinents">All Continents</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>

                <select onChange={event => handleFilterActivity(event)} >
                    <option value="allActivities">Activities</option>
                    {
                        activities?.map(value => (
                            <option value={value.name}>{value.name}</option>
                        ))
                    }
                </select>

                <select onChange={event => handleSortByName(event)}>
                    <option>Order Alphabetically</option>
                    <option value="ascending">A - Z</option>
                    <option value="descending">Z - A</option>
                </select>

                <select onChange={event => handleSortByPopulation(event)}>
                    <option>Order by Population</option>
                    <option value="higher">Higher Population</option>
                    <option value="lower">Lower Population</option>
                </select>
            </div>


            <Paginated countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginated={paginated} />

            <SearchBar />

            <div className={style.CardsBox}>
                {
                    currentCountries?.map(country => {
                        return (
                            <div className={style.Card} >
                                <Link to={`/home/${country.id}`} >
                                    <Card name={country.name} flag={country.flag} continent={country.continent} />
                                </Link>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )

}