import React, { useEffect, useState } from 'react';
 
const SelectCountry = (props) => {
    let [countries,setCountries] = useState([]);
    let setSelectedCountry = props.setSelectedCountry;

    useEffect(()=>{
        setCountries(props.countries);
    }, [props.countries])
    
    return(
        <form className="form-inline no-pad">
            <select className="form-control form-control-md" onChange={(e) => props.setSelectedCountry(e.target.value)}>
            <option key="world" value="World">World</option>
            {countries.map((country, index) => {
                return <option key={index} value={country.country}>{country.country}</option>
            })}
        </select>
        </form>
    )
}

export default SelectCountry;