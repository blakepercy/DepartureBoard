import React, { Component } from 'react';

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

  componentDidMount() {
    fetch('http://localhost:8080/departures')
      .then(response => response.json())
      .then(data => {
        this.setState({ locationName: <div className="Location-header"><h2>{data.getStationBoardResult.locationName}</h2></div> });

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