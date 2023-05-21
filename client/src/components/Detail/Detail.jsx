import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";

export default function Detail(props) {

    const dispatch = useDispatch();

    const countryDetail = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, []);


    return (
        <div>
            <div>
                {
                    countryDetail.length ?
                        <div>
                            <div>
                                <img src={countryDetail[0].flag} alt={countryDetail[0].name}/>
                            </div>
                            <div>
                                <h1>{countryDetail[0].name}</h1>
                                <div>
                                    <h2>ID: {countryDetail[0].id}</h2>
                                    <h2>Continent: {countryDetail[0].continent}</h2>
                                    <h2>Capital: {countryDetail[0].capital}</h2>
                                    <h2>Subregion: {countryDetail[0].subregion}</h2>
                                    <h2>Area: {countryDetail[0].area} km^2</h2>
                                    <h2>Population: {countryDetail[0].population}</h2>
                                </div>
                            </div>

                            <div>  {countryDetail[0].activities.map(el => {
                                return (
                                    <div>
                                    
                                            <h1>Activity</h1>
        
                                        <div>
                                            <h3>{el.name}</h3>
                                            <h3>Difficulty: {el.difficulty}</h3>
                                            <h3>Duration: {el.duration}</h3>
                                            <h3>Season: {el.season}</h3>
                                            <h3>___________</h3>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>

                        </div> : <div>
                            <h1> Loading... </h1>
                        </div>
                }</div>
        </div>
    );
}