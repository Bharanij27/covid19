import React, { Fragment, useEffect, useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Count from "./Count";
import Loading from "./Loading";
import Highlight from "./Highlight";
import RankCountry from "./RankCountry";
import GraphContainer from "./GraphContainer";
import data from "../data/graghData";

const Coivd = () => {
  const [covidData, setCovidData] = useState([]);
  const [countries, setCounties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("cases");
  const [mapCenter, setMapCenter] = useState([25.05, 35.05]);
  const [zoom, setZoom] = useState(2);

  const [selectedCountry, setSelectedCountry] = useState("World");
  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState({});
  const [graph, setGraph] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchData("https://disease.sh/v3/covid-19/all", setCovidData);
    fetchData(`https://disease.sh/v3/covid-19/countries/`, setCounties);
    fetchData("https://disease.sh/v3/covid-19/historical/all", setGraphData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCountry === "World") {
      fetchData(`https://disease.sh/v3/covid-19/all`, setCovidData);
      fetchData(`https://disease.sh/v3/covid-19/countries/`, setTableData);
      fetchData("https://disease.sh/v3/covid-19/historical/all", setGraphData);
    } else {
      fetchData(
        `https://disease.sh/v3/covid-19/countries/${selectedCountry}`,
        setCovidData
      );
      fetchData(
        `https://covid19.mathdro.id/api/countries/${selectedCountry}/confirmed`,
        setTableData
      );
      fetchData(
        `https://disease.sh/v3/covid-19/historical/${selectedCountry}`,
        setGraphData
      );
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (graphData && graphData[active]) {
      data.labels = Object.keys(graphData[active]);
      let values = [...Object.values(graphData[active])];
      data.datasets.data = values;
      setGraph(data);
    }
  }, [graphData]);

  useEffect(() => {
    if (selectedCountry !== "World") {
      setMapCenter([covidData.countryInfo.lat, covidData.countryInfo.long]);
      setZoom(4);
    } else {
      setMapCenter([25.05, 35.05]);
      setZoom(2);
    }
  }, [covidData]);

  async function fetchData(url, setData) {
    const apiCall = await fetch(url);
    const result = await apiCall.json();
    setData(result);
  }

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="row ml-3 mr-3">
            <Count
              countries={countries}
              setSelectedCountry={setSelectedCountry}
              caseDetails={covidData}
              active={active}
              setActive={setActive}
              selectedCountry={selectedCountry}
            />
            <div className="map col-sm-5 col-12">
            {graph && (
                <GraphContainer graphData={graphData} active={active} />
              )}
            </div>
        
            </div>
            <div className="row m-3 mt-5">
              <div className="col-sm-6 col-12 no-pad">
              <Map
                style={{ height: "420px", width: "100%" }}
                zoom={zoom}
                center={mapCenter}
              >
                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Highlight
                  active={active}
                  countries={countries}
                  total={covidData.cases}
                  currentData="cases"
                />
              </Map>
              
              </div>
              <RankCountry
                selectedCountry={selectedCountry}
                selectedType={active}
                tableData={tableData}
              />
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Coivd;
