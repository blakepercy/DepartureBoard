import React, {Component} from 'react';
import Clock from './Clock';
import DepartureBoardClient from './DepartureBoardClient';
import NreLogo from "./NreLogo";
import TrainTable from "./TrainTable";
import CurrentStation from "./CurrentStation";
import RowQuantitySelector from "./RowQuantitySelector";

class DepartureBoard extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
          crs: "DBY",
          rows: 10
        };

    this.departureBoardClient = new DepartureBoardClient();
    this.trainTable = null;

    // This binding is necessary to make `this` work in the callback
    this.updateCrs = this.updateCrs.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.trainTableMount = this.trainTableMount.bind(this);
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
    const departuresResponse = await this.departureBoardClient.getDepartures(this.state.crs, this.state.rows);

    // Determine if trains or buses are running
    let rawServices = null;
    if (this.trainsAreRunning(departuresResponse)) {
      rawServices = departuresResponse.trainServices;
    }
    else if (this.bussesAreRunning(departuresResponse)) {
      rawServices = departuresResponse.busServices;
    }

    // Update the table of departing trains
    this.trainTable.updateTrainTable(rawServices);
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

  updateCrs(crs) {
    this.setState({
      crs: crs
    });
    this.fullUpdate();
  }

  updateRows(rows) {
    this.setState({
      rows: rows
    });
    this.fullUpdate();
  }

  async fullUpdate() {
    await this.departureBoardClient.getDepartures(this.state.crs, this.state.rows);
    this.updateDepartureTimes();
  }

  trainTableMount(trainTableObject) {
    this.trainTable = trainTableObject;
  }

  render() {
    return (
        <div>
          <div className="Location-header">
            <CurrentStation crs={this.state.crs} updateCrs={this.updateCrs} />
          </div>
          <div>
            <TrainTable mountedCallback={this.trainTableMount} />
          </div>
          <div className="Left-align Padding">
            <RowQuantitySelector rowCount={this.state.rows} updateRowState={this.updateRows} />
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