import React, {Component} from 'react';
import Clock from './Clock';
import DepartureBoardClient from './DepartureBoardClient';
import CrsForm from './CrsForm';
import NreLogo from "./NreLogo";
import TrainTable from "./TrainTable";
import CurrentStation from "./CurrentStation";

class DepartureBoard extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
          location: "",
          trainServices: [],
          crs: "MTB"
        };

    this.departureBoardClient = new DepartureBoardClient();

    // This binding is necessary to make `this` work in the callback
    this.updateCrs = this.updateCrs.bind(this);
  }

  getLocationFromDeparturesResponse(departuresResponse) {
    return departuresResponse.locationName;
  }

  trainsAreRunning(departuresResponse) {
    if (departuresResponse.trainServices != null) {
      return true;
    }
  }

  bussesAreRunning(departuresResponse) {
    if (departuresResponse.busServices != null) {
      return true;
    }
  }

  async updateDepartureTimes() {
    const departuresResponse = await this.departureBoardClient.getDepartures(this.state.crs);

    // Set the current station
    this.setState({
      location: this.getLocationFromDeparturesResponse(departuresResponse)
    });

    // Determine if trains or buses are running
    let rawServices = null;
    if (this.trainsAreRunning(departuresResponse)) {
      rawServices = departuresResponse.trainServices;
    }
    else if (this.bussesAreRunning(departuresResponse)) {
      rawServices = departuresResponse.busServices;
    }

    // Set the table of departing trains
    this.setState({trainServices: new TrainTable().render(rawServices)})
  }

  componentDidMount() {
    this.updateDepartureTimes();

    this.timerID = setInterval(
        () => this.updateDepartureTimes(),
        10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async updateCrs(crs) {
    this.setState({
      crs: crs
    });

    await this.departureBoardClient.getDepartures(this.state.crs);

    this.updateDepartureTimes();
  }

  render() {
    return (
        <div>
          <div className="Location-header">
            {new CurrentStation().render(this.state.location)}
            <CrsForm crsCallback={this.updateCrs}/>
          </div>
          <div>
            {this.state.trainServices}
          </div>
          <div className="Top-padding">
            <Clock/>
            <NreLogo height={40}/>
          </div>
        </div>
    );
  }
}

export default DepartureBoard;