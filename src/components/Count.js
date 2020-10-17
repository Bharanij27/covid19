import React from "react";
import Value from './Value';
import SelectCountry from "./SelectCountry";

const Count = (props) => {
    let coivdCount = props.caseDetails;

  return (
    <div className="col-sm-7 col-12">
      <SelectCountry
              countries={props.countries}
              setSelectedCountry={props.setSelectedCountry}
        />
        <div className="row">
          <Value content ={coivdCount.cases} class = "cases" subcontent={coivdCount.todayCases}  head = "Confirmed" variant="danger" setActive={props.setActive} active={props.active === "cases"}/>
          <Value content ={coivdCount.active} class = "active" head = "Active" variant="primary" setActive={props.setActive} active={props.active === "active"}/>
          <Value content ={coivdCount.recovered} class="recovered" head = "Recovered" subcontent={coivdCount.todayRecovered} variant="success" setActive={props.setActive} active={props.active === "recovered"}/>
          <Value content ={coivdCount.deaths} class="deaths" head = "Deaths" subcontent={coivdCount.todayDeaths} variant="secondary" setActive={props.setActive} active={props.active === "deaths"}/> 
        </div>
    </div>
  );
};

export default Count;
