import style from "../Paginated/paginated.module.css"

export default function Paginated({ countriesPerPage, allCountries, paginated }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={style.Paginated}>
            <ul className={style.Paginated__List}>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return (
                            <li key={number} >
                                <button className={style.Paginated__Number} onClick={() => paginated(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}