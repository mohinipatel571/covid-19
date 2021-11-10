import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const CSVToJSON = (csv) => {
  const lines = csv.split("\n");
  const keys = lines[0].split(",");
  return lines.slice(1).map((line) => {
    return line.split(",").reduce((acc, cur, i) => {
      const toAdd = {};
      toAdd[keys[i]] = cur;
      return { ...acc, ...toAdd };
    }, {});
  });
};
function Line() {
  const [data, setData] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [activeCases, setActiveCases] = useState([]);
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: stateNames,
      },
    },
    series: [
      {
        name: "Active cases",
        data: activeCases,
      },
    ],
  };
  useEffect(() => {
    // axios.get("https://disease.sh/v3/covid-19/countries").then((res)=>{
    axios
      .get("https://data.covid19india.org/csv/latest/raw_data26.csv")
      .then((res) => {
        setData(
          CSVToJSON(res.data).map((value) => {
            if (value["State code"] == "MH") {
              return value;
            }
          })
        );
        // setData(res.data.filter(({country})=>{
        //   switch(country){
        //     case "USA":return false;
        //     case "Peru":return false;
        //     case "UK":return false;
        //     case "Russia":return false;
        //     default :return true;
        //   }
        // }))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // useEffect(()=>{
  //   const tempStateNames = data.map((value)=>{
  //     return value.country
  //   })
  //   const tempactiveCases = data.map((value)=>{
  //     return value.active
  //   })
  //   setStateNames(tempStateNames)
  //   setActiveCases(tempactiveCases)
  // },[data])
  return (
    <div className="Line">
      {console.log(data)}
      <Chart options={chartData.options} series={chartData.series} type="bar" />
    </div>
  );
}

export default Line;
