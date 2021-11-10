import React, { useEffect, useState } from "react";
import styles from "./App.css";
import { Cards, Charts, CountryPicker } from "./Components";
import { fetchData } from "./API";
import coronaImage from "./Components/Images/Covid19Tracker.png";
const App = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState({});

  useEffect(async () => {
    const tempdata = await fetchData();
    setData(tempdata);
  }, []);

  const handleCountryChange = async (country) => {
    const tempdata = await fetchData(country);
    setData(tempdata);
    setCountry(country);
  };

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center" }}>
        <img className={"image"} src={coronaImage} alt="Covid-19" />
      </div>

      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Charts data={data} country={country} />
    </div>
  );
};

export default App;
