import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Modal from "react-bootstrap/Modal";
const DrilledChart = () => {
  const [data, setData] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [activeCases, setActiveCases] = useState([]);
  const [stateName, setStateName] = useState("MP");
  const [cityActiveCases, setCityActiveCases] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const charData = {
    options: {
      chart: {
        id: "basic-bar",
        events: {
          click: function (chartContext, seriesIndex, config) {
            const index = config.dataPointIndex;
            const tempData = data[stateNames[index]]?.districts;
            const tempCityNames = Object.keys(tempData);
            const tempCasesData = tempCityNames.map((tempCity) => {
              return tempData[tempCity].total.confirmed;
            });
            setCityActiveCases(tempCasesData);
            setCityNames(tempCityNames);
            setStateName(stateNames[index]);
            handleShow();
          },
        },
      },
      xaxis: {
        categories: stateNames,
      },
    },
    series: [
      {
        name: "series-1",
        data: activeCases,
      },
    ],
  };
  useEffect(() => {
    var tempStateNames = Object.keys(data).filter((stateName) => {
      return stateName !== "TT";
    });
    const confirmedCases = tempStateNames.map((stateName) => {
      return data[stateName].total.confirmed;
    });
    setStateNames(tempStateNames);
    setActiveCases(confirmedCases);
  }, [data]);
  useEffect(() => {
    const API_URL = "https://data.covid19india.org/v4/min/data.min.json";
    axios
      .get(API_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <div>
        <Chart
          options={charData.options}
          series={charData.series}
          type="bar"
          height="500px"
        />
        <div style={{ width: "90%" }}>
          <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>{stateName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Chart
                options={{
                  chart: {
                    id: "basic-bar",
                  },
                  xaxis: {
                    categories: cityNames,
                  },
                }}
                series={[
                  {
                    name: "District",
                    data: cityActiveCases,
                  },
                ]}
                type="bar"
                height="500px"
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default DrilledChart;
