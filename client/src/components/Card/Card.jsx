import style from "./card.module.css"

export default function Card({ name, flag, continent }) {
    return (
        <div className={style.CardBox}>
            <h2 className={style.CardName}>{name}</h2>
            <img className={style.CardFlag} src={flag} alt="not found" />
            <h4 className={style.CardContinent}>Continent: {continent}</h4>
        </div>
    )
};