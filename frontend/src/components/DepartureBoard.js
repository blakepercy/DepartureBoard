import React, {Component} from 'react';
import Clock from './Clock';
import DepartureBoardClient from './DepartureBoardClient';
import NreLogo from "./NreLogo";
import TrainTable from "./TrainTable";
import CurrentStation from "./CurrentStation";

class DepartureBoard extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
          location: "Derby",
          trainServices: [],
          crs: "DBY"
        };

    this.departureBoardClient = new DepartureBoardClient();
    this.trainTable = new TrainTable();
    this.currentStation = new CurrentStation(this.state.location);

    // This binding is necessary to make `this` work in the callback
    this.updateCrs = this.updateCrs.bind(this);
    this.stationMount = this.stationMount.bind(this);
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

    this.currentStation.setStation(this.state.location);

    // Determine if trains or buses are running
    let rawServices = null;
    if (this.trainsAreRunning(departuresResponse)) {
      rawServices = departuresResponse.trainServices;
    }
    else if (this.bussesAreRunning(departuresResponse)) {
      rawServices = departuresResponse.busServices;
    }

    // Set the table of departing trains
    this.setState({trainServices: this.trainTable.render(rawServices)})
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

  stationMount(stationObject) {
    this.currentStation = stationObject;
  }

  render() {
    return (
        <div>
          <div className="Location-header">
            <CurrentStation station={this.state.location} mountCallback={this.stationMount} changeCrsCallback={this.updateCrs}/>
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