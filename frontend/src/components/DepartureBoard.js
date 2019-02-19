import React, {Component} from 'react';
import Clock from './Clock';

const BACKEND_PORT = process.env.REACT_APP_PORT || 8080;

class DepartureBoard extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
          locationName: null,
          trainServices: [],
        };
  }

  StartingLocation(props) {
    return (
        <div>
          <h2>{props.location}</h2>
        </div>
    );
  }

  formatServices(rawServices)
  {
    return rawServices.service.map((service) => {
      let type = service.serviceType.toString().toLowerCase();
      let departureTime = service.std;
      let punctuality = service.etd.toString().toLowerCase();
      let platform = service.platform;
      let destination = service.destination.location.map((location) => {
        return (location.locationName)
      });
      let delayReason = service.delayReason;
      return (
          <div className="Left-align Left-padding">
            <h3>
              {departureTime} - {type} to {destination} from
              platform {platform} is expected {punctuality}. {delayReason}
            </h3>
          </div>
      )
    });
  }

  updateDepartureTimes()
  {
    // Use localhost when in development
    let host = "";
    if (process.env.NODE_ENV === "development") {
      host = "http://localhost:" + BACKEND_PORT;
    }

    fetch(host + "/departures")
    .then(response => response.json())
    .then(data => {
      this.setState({
        locationName: <this.StartingLocation
            location={data.getStationBoardResult.locationName}/>
      });

      // Determine if trains or buses are running
      let rawServices = null;
      if (data.getStationBoardResult.trainServices != null) {
        rawServices = data.getStationBoardResult.trainServices;
      }
      else if (data.getStationBoardResult.busServices != null) {
        rawServices = data.getStationBoardResult.busServices;
      }

      // Extract the interesting information
      let formattedServices = this.formatServices(rawServices);
      this.setState({trainServices: formattedServices})
    })
    .catch(error => this.setState({locationName: error.toString()}));
  }

  componentDidMount() {
    console.log(process.env);

    this.timerID = setInterval(
        () => this.updateDepartureTimes(),
        10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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