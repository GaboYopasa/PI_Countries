import axios from "axios";
import { GET_COUNTRIES, FILTER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION, FILTER_BY_ACTIVITY, GET_COUNTRY_BY_NAME, GET_ACTIVITIES, POST_ACTIVITIES, GET_DETAIL } from "./action-types";

export const getCountries = () => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
};

export const searchCountryByName = (name) => {
    return async (dispatch) => {
        try {

            const json = await axios.get("http://localhost:3001/countries?name=" + name);
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: json.data
            });

        } catch (error) {
            alert("Country not found");
        }
    }
};

export const getDetail = (id) => {
    return async (dispatch) => {
        try {

            const json = await axios.get("http://localhost:3001/countries/" + id);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}

export function getActivities() {
    return async (dispatch) => {
        try {

            let json = await axios.get("http://localhost:3001/activities");
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data,
            });

        } catch (error) {
            alert("No activitie created");
            console.log(error);
        }
    };
};

export function postActivities(payload) {
    return async function (dispatch) {
        await axios.post("http://localhost:3001/activities", payload);
        return dispatch({
            type: POST_ACTIVITIES,
        });
    };
};

export const filterCountriesByContinent = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
};

export const filterByActivity = (payload) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
};

export const orderCountriesByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export const orderCountriesByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
};