import React from 'react';
import uuid from "uuid";

class TrainTable extends React.Component {
  render(rawServices) {
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
}

export default TrainTable;