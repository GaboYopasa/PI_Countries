import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountryByName } from "../../redux/actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name.length) return alert('Insert a Country');
        dispatch(searchCountryByName(name));
    };

    return(
        <div>
            <input type="text" placeholder="Search Country..." onChange={handleInputChange} value={name}/>
            <button type="submit" onClick={event => {handleSubmit(event); setName('')}}>Search</button>
        </div>
    )
}