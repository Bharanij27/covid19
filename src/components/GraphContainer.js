import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import options from "../data/options";
import colors from "../data/color";

const GraphContainer = (props) => {
  const casesType = props.active;
  const [data, setData] = useState({});

  useEffect(() => {
    let graphData;
    if(props.graphData.timeline) graphData = props.graphData.timeline;
    else graphData = props.graphData;

    const chartData = buildChartData(graphData, casesType); // data is a object
    setData(chartData);
  }, [casesType, props.graphData]);


  const buildChartData = (data, casesType = "cases") => {
    casesType = casesType == "active" ? "cases" : casesType;
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        
        if(props.active === 'active') {
          newDataPoint.y = data['cases'][date] - data['recovered'][date] - data['deaths'][date]
        }
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  return (
    <div className="mt-3">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: colors[casesType].bgcolor,
                borderColor: colors[casesType].color,
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};
export default GraphContainer;
