import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import style from "./details.module.css"

export default function Detail(props) {

    const dispatch = useDispatch();

    const countryDetail = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, []);


    return (
        <div className={style.Detail}>
            <div>
                <Link to="/home"><button>Back</button></Link>
            </div>

            <div className={style.DetailBox}>
                {
                    countryDetail.length ?
                        <div className={style.DetailCountry}>
                            <div className={style.DetailImgCont}>
                                <img className={style.DetailImg} src={countryDetail[0].flag} alt={countryDetail[0].name} />
                            </div>
                            <div className={style.DetailInfoCont}>
                                <h1 className={style.objDetail}>{countryDetail[0].name}</h1>
                                <div className={style.DetailInfo}>
                                    <h2>ID: {countryDetail[0].id}</h2>
                                    <h2>Continent: {countryDetail[0].continent}</h2>
                                    <h2>Capital: {countryDetail[0].capital}</h2>
                                    <h2>Subregion: {countryDetail[0].subregion}</h2>
                                    <h2>Area: {countryDetail[0].area} km^2</h2>
                                    <h2>Population: {countryDetail[0].population}</h2>
                                </div>
                            </div>

                            <div className={style.DetailActivities}>
                                {
                                    countryDetail[0].activities.map(el => {
                                        return (
                                            <div>
                                                <h1>Activity</h1>
                                                <div>
                                                    <h3>{el.name}</h3>
                                                    <h3>Difficulty: {el.difficulty}</h3>
                                                    <h3>Duration (min): {el.duration}</h3>
                                                    <h3>Season: {el.season}</h3>
                                                    <h3>___________________</h3>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>

                        </div> : <div className={style.loading}>
                            <h1>Loading...</h1>
                        </div>
                }</div>
        </div>
    );
}