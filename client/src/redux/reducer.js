import { GET_COUNTRIES, FILTER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION, FILTER_BY_ACTIVITY, GET_COUNTRY_BY_NAME, POST_ACTIVITIES, GET_ACTIVITIES, GET_DETAIL } from "./action-types";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }    

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }

        case POST_ACTIVITIES:
            return {
                ...state
            }


        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            const continentFiltered = action.payload === "AllContinents" ? allCountries : allCountries.filter(country => country.continent === action.payload);

            return {
                ...state,
                countries: continentFiltered
            }


        case FILTER_BY_ACTIVITY:
            const allActivities = state.allCountries;
            const filteredByName = allActivities.filter((c) => c.activities.find((c) => c.name === action.payload));
            const activityFilter = action.payload === "allActivities" ? allActivities : filteredByName;

            return {
                ...state,
                countries: activityFilter
            }


        case ORDER_BY_NAME:
            const orderCountriesByName = action.payload === "ascending" ? state.countries.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
                :
                state.countries.sort((a, b) => {
                    if (a.name < b.name) return 1;
                    if (a.name > b.name) return -1;
                    return 0;
                })

            return {
                ...state,
                countries: orderCountriesByName
            }


        case ORDER_BY_POPULATION:
            const orderCountriesByPopulation = action.payload === "higher" ? state.countries.sort((a, b) => {
                if (a.population < b.population) return -1;
                if (a.population > b.population) return 1;
                return 0;
            })
                :
                state.countries.sort((a, b) => {
                    if (a.population < b.population) return 1;
                    if (a.population > b.population) return -1;
                    return 0;
                })

            return {
                ...state,
                countries: orderCountriesByPopulation
            }


        default:
            return { ...state };
    }
};

export default rootReducer;