import { Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import colors from '../data/color';

const Higlight = (props) => {
    try {
        
        return (
            props.countries.length ? 
            props.countries.map((country, idx) => {
            return (
            <Circle
            key={idx}
            radius={Math.sqrt(country[props.active]) * colors[props.active].round}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={colors[props.active].color}
          />) 
        })
        : null
      );
    } catch (error) {
        return<div></div>
    }
};

export default Higlight;
