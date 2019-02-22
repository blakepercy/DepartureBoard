import React, {Component} from 'react';
import Clock from './Clock';
import StartingLocation from "./StartingLocation";
import DepartureBoardClient from './DepartureBoardClient';
import CrsForm from './CrsForm';
import uuid from "uuid";
import NreLogo from "./NreLogo";

class DepartureBoard extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
          location: "",
          locationName: null,
          trainServices: [],
          stationBoardResult: null,
          startingLocation: null,
          crs: "MTB"
        };

    // This binding is necessary to make `this` work in the callback
    this.updateLocation = this.updateLocation.bind(this);
  }

  getLocation(departuresResponse) {
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

  formatServices(rawServices)
  {
    let head = (
        <thead>
          <tr>
            <th className="Small-column">Planned</th>
            <th className="Medium-column">Destination</th>
            <th className="Small-column Centre-align">Platform</th>
            <th className="Small-column">Expected</th>
            <th className="Large-column">Comments</th>
          </tr>
        </thead>
    );

    let body = rawServices.service.map((service) => {
      let departureTime = service.std;
      let punctuality = service.etd.toString().toLowerCase();
      let platform = service.platform;
      let destination = service.destination.location.map((location) => {
        return (location.locationName)
      });
      let delayReason = service.delayReason;
      return (
          <tbody key={uuid.v4()}>
            <tr>
              <td className="Small-column">{departureTime}</td>
              <td className="Medium-column">{destination}</td>
              <td className="Small-column Centre-align">{platform}</td>
              <td className="Small-column">{punctuality}</td>
              <td className="Large-column">{delayReason}</td>
            </tr>
          </tbody>
      )
    });

    return (
        <div>
          <table>
            {head}
            {body}
          </table>
        </div>
    );
  }

  async updateDepartureTimes() {
    let departureBoardClient = new DepartureBoardClient();
    const departuresResponse = await departureBoardClient.getDepartures(this.state.crs);

    this.setState({
      startingLocation: new StartingLocation(
          {
            location: this.getLocation(departuresResponse)
          })
    });

    this.setState({
      location: this.getLocation(departuresResponse)
    });

    this.setState({
      locationName: this.state.startingLocation.render()
    });

    // Determine if trains or buses are running
    let rawServices = null;
    if (this.trainsAreRunning(departuresResponse)) {
      rawServices = departuresResponse.trainServices;
    }
    else if (this.bussesAreRunning(departuresResponse)) {
      rawServices = departuresResponse.busServices;
    }

    // Extract the interesting information
    let formattedServices = this.formatServices(rawServices);
    this.setState({trainServices: formattedServices})
  }

  componentDidMount() {
    console.log(process.env);
    this.updateDepartureTimes();

    this.timerID = setInterval(
        () => this.updateDepartureTimes(),
        10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  toggleLocation() {
    let location = "";
    if (this.state.crs === "MTB")
    {
      location = "DBY";
    }
    else {
      location = "MTB";
    }
    this.updateLocation(location);
  }

  async updateLocation(location) {
    // let location = "";
    // if (this.state.crs === "MTB")
    // {
    //   location = "DBY";
    // }
    // else {
    //   location = "MTB";
    // }

    this.setState({
      crs: location
    });

    let departureBoardClient = new DepartureBoardClient();
    await departureBoardClient.getDepartures(this.state.crs);

    this.updateDepartureTimes();
  }

  render() {
    const {locationName, trainServices} = this.state;

    return (
        <div>
          <div className="Location-header">
            {locationName}
            <CrsForm locationCallback={this.updateLocation}/>
          </div>
          <div>
            {trainServices}
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