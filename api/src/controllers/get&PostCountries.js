const { getDbInfo } = require("./controllers");


const getCountries = async (req, res) => {
        try {
        
        const { name } = req.query;
        const allCountries = await getDbInfo();

        if (name) {

            let countryName = await allCountries.filter((country) => country.name.toLowerCase().includes(name.toLowerCase()));

            if (!countryName.length) {
                throw new Error("Country not found");

            } else {
                res.status(200).json(countryName);
            }

        } else {
            res.status(200).json(allCountries);
        }

    } catch (error) {
        res.status(404).send(error.message);
    }

};

const getCountryId = async (req, res) => {
    try {

        const { id } = req.params;
        let totalCountries = await getDbInfo();

        if (id) {
            let countryId = await totalCountries.filter((country) => country.id === id.toUpperCase());

            if (countryId.length) {
                res.status(200).send(countryId);

            } else {
                throw new Error("Country not found");
            }
        }
    } catch (error) {
        res.status(400).json(error.message);
    }

}

module.exports = {
    getCountries,
    getCountryId
}





// const { Router } = require("express");
// const router = Router();

// router.get("/", async (req, res) => {
//     const { name } = req.query;
//     let totalCountries = await getDbInfo();

//     if (name) {
//         let countryName = await totalCountries.filter((el) =>
//         el.name.toLowerCase().includes(name.toLowerCase())
//         );
//         if (countryName.length) {
//         res.status(200).send(countryName);
//         } else {
//         res.status(404).json({ message: "Country not found" });
//         }
//     } else {
//         res.status(200).send(totalCountries);
//     }
//     });

// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     let totalCountries = await getDbInfo();
//     if (id) {
//         let countryId = await totalCountries.filter(
//             (el) => el.id === id.toUpperCase()
//         );
//         if (countryId.length) {
//             res.status(200).send(countryId);
//         } else {
//             res.status(400).json({ message: "Country not found" });
//         }
//     }
// });

// module.exports = router;