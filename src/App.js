import React from "react";
import styles from "./App.css";
import { Cards, Charts, CountryPicker } from "./Components";
import { fetchData } from "./API"; //we dont have to specify index file name if your file name is index
import coronaImage from "./Components/Images/Covid19Tracker.png";
import DrilledChart from "./Components/DrilledChart";
import { red } from "@material-ui/core/colors";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const data = await fetchData();
    //console.log(fetchedData);
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data: data, country: country });
  };

  handlechart() {
    this.setState(DrilledChart);
  }
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center" }}>
          <img className={"image"} src={coronaImage} alt="Covid-19" />
        </div>

        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
        <DrilledChart />
      </div>
    );
  }
}

export default App;
