import React, { Component } from 'react';

const BACKEND_PORT = process.env.REACT_APP_PORT || 8080;

class DepartureBoard extends Component
{
  constructor()
  {
    super();
    this.state =
        {
          locationName: null,
          trainServices: [],
        };
  }

  StartingLocation(props) {
    return (
        <div className="Location-header">
          <h2>{props.location}</h2>
        </div>
    );
  }

  componentDidMount() {
    console.log(process.env);

    // Use localhost when in development
    let host = "";
    if (process.env.NODE_ENV === "development")
    {
      host = "http://localhost:" + BACKEND_PORT;
    }

    fetch(host + "/departures")
      .then(response => response.json())
      .then(data => {
        this.setState({ locationName: <this.StartingLocation location={data.getStationBoardResult.locationName} />});

        let services = null;

        if (data.getStationBoardResult.trainServices != null)
        {
          services = data.getStationBoardResult.trainServices.service.map((service) => {
            let type = service.serviceType.toString().toLowerCase();
            let departureTime = service.std;
            let punctuality = service.etd.toString().toLowerCase();
            let platform = service.platform;
            let destination = service.destination.location.map((location) => {return(location.locationName)});
            let delayReason = service.delayReason;
            return(
                <div className="Left-align Left-padding">
                  <h3>
                    {departureTime} - {type} to {destination} from platform {platform} is expected {punctuality}. {delayReason}
                  </h3>
                </div>
            )
          });
        }
        else if (data.getStationBoardResult.busServices != null)
        {
          services = data.getStationBoardResult.busServices.service.map((service) => {
            let type = service.serviceType.toString().toLowerCase();
            let departureTime = service.std;
            let punctuality = service.etd.toString().toLowerCase();
            let platform = service.platform;
            let destination = service.destination.location.map((location) => {return(location.locationName)});
            let delayReason = service.delayReason;
            return(
                <div className="Left-align Left-padding">
                  <h3>
                    {departureTime} - {type} to {destination} from platform {platform} is expected {punctuality}. {delayReason}
                  </h3>
                </div>
            )
          });
        }
        this.setState({ trainServices: services })
      })
      .catch(error => this.setState( {locationName: error.toString()} ));
  }

  render()
  {
    const { locationName, trainServices } = this.state;

    return (
        <div>
          {locationName}
          {trainServices}
        </div>
    );
  }
}

export default DepartureBoard;