const { Country, Activity } = require("../db.js");
const axios = require("axios");
const URL = "https://restcountries.com/v3.1/all";

// {
//     "countryId": "ARG",
//     "name": "see the sunset",
//     "difficulty": 1,
//     "duration": "1 hour",
//     "season": "Summer"
//   }

const getApiInfo = async () => {
    const apiUrl = await axios.get(URL);

    const apiInfo = await apiUrl.data.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.png,
            capital: country.capital,
            continent: country.region,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
        };
    });

    const saveDbInfo = async () => {
        apiInfo.map((ele) => {
            Country.findOrCreate({
                where: {
                    name: ele.name,
                    id: ele.id,
                },
                defaults: {
                    continent: ele.continent,
                    flag: ele.flag,
                    capital: ele.capital,
                    subregion: ele.subregion,
                    area: ele.area,
                    population: ele.population,
                }
            });
        });
    };

    saveDbInfo();

    return apiInfo;
};


const getDbInfo = async () => {

    await getApiInfo();
    const aux = await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
                attributes: [],
            },
        },
    });
    return aux;
};


const getActivities = async () => {
    
    const get = await Activity.findAll();
    return get;
};


module.exports = {
    getDbInfo,
    getActivities
};





// const getApiInfo = async () => {
//     try {

//         const apiUrl = await axios.get(URL);

//         const apiInfo = await apiUrl.data.map(country => {
//             return {
//                 id: country.cca3,
//                 name: country.name.common,
//                 flag: country.flags.png,
//                 continent: country.region,
//                 capital: country.capital,
//                 subregion: country.subregion,
//                 area: country.area,
//                 population: country.population,
//             };
//         });

//         const saveDbInfo = async () => {
//             apiInfo.map((ele) => {
//                 Country.findOrCreate({
//                     where: {
//                         name: ele.name,
//                         id: ele.id,
//                     },
//                     defaults: {
//                         continent: ele.continent,
//                         flag: ele.flag,
//                         capital: ele.capital,
//                         subregion: ele.subregion,
//                         area: ele.area,
//                         population: ele.population,
//                     }
//                 });
//             });
//         };

//         saveDbInfo();

//         return apiInfo;
//     } catch (error) {
//         return Error({ message: error.message });
//     }
// };


// const getDbInfo = async () => {
//     try {

//         await getApiInfo();
//         const aux = await Country.findAll({
//             include: {
//                 model: Activity,
//                 attributes: ["name", "difficulty", "duration", "season"],
//                 through: {
//                     attributes: [],
//                 },
//             },
//         });
//         return aux;

//     } catch (error) {
//         return Error({ message: error.message });
//     }
// };


// const getActivities = async () => {
//     try {

//         const get = await Activity.findAll();
//         return get;

//     } catch (error) {
//         return Error({ message: error.message });
//     }

// };

