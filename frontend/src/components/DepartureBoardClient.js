import React from 'react';

const BACKEND_PORT = process.env.REACT_APP_PORT || 8080;

class DepartureBoardClient extends React.Component {
  constructor(props) {
    super(props);
    this.state =
        {
          stationBoardResult: null
        };
  }

  async getDepartures(crs, rows) {
    // Use localhost when in development
    let host = "";
    if (process.env.NODE_ENV === "development") {
      host = "http://localhost:" + BACKEND_PORT;
    }

    await fetch(host + "/departures/" + crs + "?rows=" + rows)
    .then(response => response.json())
    .then(data => data.getStationBoardResult)
    .then(stationBoardResult => {
      this.state.stationBoardResult = stationBoardResult;
    })
    .catch(error => console.log(error.toString()));

    return this.state.stationBoardResult;
  }

}

export default DepartureBoardClient;