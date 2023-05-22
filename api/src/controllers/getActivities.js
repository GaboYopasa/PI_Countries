const { getActivities } = require("./controllers");
const { Country, Activity } = require('../db.js');

const postActivity = async (req, res) => {
    try {

        const { countryId, name, difficulty, duration, season } = req.body;

        const createActivity = await Activity.create({
            countryId,
            name,
            difficulty,
            duration,
            season
        });

        const countries = await Country.findAll({
            where: { id: countryId }
        })

        createActivity.addCountries(countries);

        return res.status(200).send(createActivity);

    } catch (error) {
        res.status(406).send("Could not create activity");
    }

}

const getActivity = async (req, res) => {
    try {

        const activities = await getActivities();
        return res.status(200).send(activities);

    } catch (error) {
        res.status(402).send("The activity doesn't exist");
    }

};

module.exports = {
    postActivity,
    getActivity
}




// const { Router } = require('express');
// const router = Router();


// router.post('/', async (req, res) => {

//     const { countryId, name, difficulty, duration, season } = req.body;

//     const createActivity = await Activity.create({
//         countryId,
//         name,
//         difficulty,
//         duration,
//         season
//     });

//     const countries = await Country.findAll({
//         where: { id: countryId }
//     })

//     createActivity.addCountries(countries)

//     return res.status(200).send(createActivity)
// });


// router.get('/', async (req, res) => {

//     const activities = await getActivities();
    
//     return res.status(200).send(activities)
// });

// module.exports = router;