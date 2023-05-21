const { Router } = require('express');
const { getCountries, getCountryId } = require("../controllers/get&PostCountries");
const { postActivity, getActivity } = require("../controllers/getActivities")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", (req, res) => {
    getCountries(req, res);
});

router.get("/countries/:id", (req, res) => {
    getCountryId(req, res);
});

router.post("/activities", (req, res) => {
    postActivity(req, res);
});

router.get("/activities", (req, res) => {
    getActivity(req, res);
});


module.exports = router;





// const countryRouter = require("../controllers/get&PostCountries");
// const activityRouter = require("../controllers/getActivities")


// router.use('/countries', countryRouter);
// router.use('/activity', activityRouter);