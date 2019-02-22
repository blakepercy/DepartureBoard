import React, {Component} from 'react';
import Clock from './Clock';
import StartingLocation from "./StartingLocation";
import DepartureBoardClient from './DepartureBoardClient';
import uuid from "uuid";

class DepartureBoard extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
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
    return rawServices.service.map((service) => {
      let departureTime = service.std;
      let punctuality = service.etd.toString().toLowerCase();
      let platform = service.platform;
      let destination = service.destination.location.map((location) => {
        return (location.locationName)
      });
      let delayReason = service.delayReason;
      return (
          <div key={uuid.v4()}>
            <table>
              <tr>
                <td className="Small-column">{departureTime}</td>
                <td className="Medium-column">{destination}</td>
                <td className="Small-column">{platform}</td>
                <td className="Small-column">{punctuality}</td>
                <td className="Large-column">{delayReason}</td>
              </tr>
            </table>
          </div>
      )
    });
  }

  async updateDepartureTimes() {
    let departureBoardClient = new DepartureBoardClient();
    const departuresResponse = await departureBoardClient.getDepartures(this.state.crs);
    console.log("updateDepartureTimes: ", departuresResponse);

    this.setState({
      startingLocation: new StartingLocation(
          {
            location: this.getLocation(departuresResponse),
            update: this.updateLocation
          })
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

  updateLocation() {
    let location = "";
    if (this.state.crs === "MTB")
    {
      location = "DBY";
    }
    else {
      location = "MTB";
    }

    console.log("Updating Location: ", location);
    this.state.startingLocation.updateLocation(location);

    this.setState({
      locationName: this.state.startingLocation.render()
    });

    this.setState({
      crs: location,
      trainServices: "Loading..."
    });
  }

  render() {
    const {locationName, trainServices} = this.state;

    return (
        <div>
          <div className="Location-header">
            {locationName}
            <Clock/>
          </div>
          <div>
            {trainServices}
          </div>
        </div>
    );
  }
}

export default DepartureBoard;