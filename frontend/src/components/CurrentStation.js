import React from "react";

class CurrentStation extends React.Component {
  constructor(props) {
    super(props);
  }

  render(station) {
    return (
        <div>
          <h2>{station}</h2>
        </div>
    );
  }
}

export default CurrentStation;