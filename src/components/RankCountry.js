import React, { Fragment, useEffect } from 'react';
import colors from '../data/color';

const RankCountry = (props) => {

    let selectedType = props.selectedType || '';
    let sortedData = props.tableData || [];
    let selected = {'cases' : 'Confirmed', 'active' : 'Active', 'recovered' : 'Recovered', 'deaths' : 'Deaths'}

    useEffect(() => {
        let el = document.querySelector('.table');
        let tbody = document.createElement('tbody');
        tbody.classList.add('tbody');

        if(sortedData.length && sortedData[0].provinceState !== null){
            el.style.color = colors[selectedType].color + '!impotant'; 
            sortedData.sort((a, b)=> b[selectedType] - a[selectedType])
            sortedData.forEach(data => {
                let row = document.createElement('tr');
                let name = document.createElement('th');
                name.innerText = data.country || data.provinceState;
                name.classList.add('text-left', 'ml-3');

                let count = document.createElement('th');
                count.innerText = data[selectedType] || data[selected[selectedType].toLowerCase()];

                row.append(name, count);
                tbody.append(row);
            });
            if(el.children.length) el.removeChild(el.firstChild);
            el.append(tbody);
        }
        
    }, [sortedData, selectedType])

    return(
        <div className="col-sm-6 col-12 ">
        <h3 className="m-3 text-center">Live {selected[props.selectedType]} cases by {props.selectedCountry === 'World' ? 'Country' : 'State'}</h3>
        <div className="tablecontainer ml-5">
        {sortedData.length && sortedData[0].provinceState !== null ? 
            <table className="table table-borderless tablesorted">
            </table>
         : 'No State wise data Available' }
        </div>
        </div>
    )
}

export default RankCountry;