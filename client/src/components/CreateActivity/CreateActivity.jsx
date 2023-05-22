import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postActivities, getActivities, getCountries } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


function validate(input) {
    let errors = {};
    if (!input.name) errors.name = 'You must fill this field';
    if(typeof input.name !== "number") errors.name = "The name of your activity can't contain numbers";
    if (!input.duration) errors.duration = 'You must fill this field';
    if (!input.difficulty) errors.difficulty = 'You must choose the difficulty';
    if (!input.season) errors.difficulty = 'You must choose the season';
    if (!input.countryId === []) errors.countryId = 'You must select a country'

    return errors;
};


export default function CreateActivity() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector(state => state.countries);
    const [errors, setErrors] = useState({});
    
    const countriesSortAlphabetically = countries.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: []
    });
    
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, []);

    
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });

        setErrors(
            validate({
                ...input,
                [event.target.name]: event.target.value
            })
        );
    }

    const handleSelect = (event) => {
        setInput({
            ...input,
            countryId: [...input.countryId, event.target.value]
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.name === '' || input.duration === '' || input.difficulty === '' || input.season === '' || input.countryId.length === 0)
            return alert('You must complete the fields');

        dispatch(postActivities(input));
        alert('Activity Created!');

        setInput({
            countryId: [],
            name: "",
            difficulty: 0,
            duration: "",
            season: ""
        });

        history.push('/home')
    };

    const handleDelete = (country) => {
        setInput({
            ...input,
            countryId: input.countryId.filter((value => value !== country))
        })
    };


    return (
        <div>
            <Link to="/home"><button>Back</button></Link>
            <div>
                <form onSubmit={value => handleSubmit(value)}>
                    <h1>Create your activity!</h1>
                    <div>
                        <label>Activity: </label>
                        <input type="text" value={input.name} name="name" onChange={handleChange} />
                        {errors.name && <p>{errors.name}</p>}
                    </div>

                    <div>
                        <label>Difficulty: </label>
                        <input type="range" min="1" max="5" value={input.difficulty} name="difficulty" onChange={handleChange} />
                        {errors.difficulty && <p>{errors.difficulty}</p>}
                    </div>

                    <div>
                        <label>Duration (min): </label>
                        <input type="number" min="1" max="1440" value={input.duration} name="duration" onChange={handleChange} />
                        {errors.duration && <p>{errors.duration}</p>}
                    </div>

                    <div>
                        <label>Season: </label>
                        <select name="season" value={input.season} onChange={handleChange}>
                            <option>Select a season...</option>
                            <option value="Winter">Winter</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Spring">Spring</option>
                        </select>
                        {errors.season && <p>{errors.season}</p>}
                    </div>

                    <div>
                        <label>Countries: </label>
                        <select onChange={handleSelect}>
                            <option>Choose the countries...</option>
                            {
                                countriesSortAlphabetically.map(country => (
                                    <option value={country.id}>{`${country.name} (${country.id})`}</option>
                                ))
                            }
                        </select>
                        {errors.countryId && <p>{errors.countryId}</p>}
                    </div>

                    <div>
                        {input.countryId.map((country) => (
                            <div>
                                <input type='button' value='X' onClick={() => handleDelete(country)} />
                                <p>{country}</p>
                            </div>
                        ))}
                    </div>

                    <button type="submit">Create Activity</button>
                </form>
            </div>
        </div>
    )
}