import React from 'react';

class CrsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {crs: "MTB"};
    this.crsCallback = props.crsCallback;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
  {
    this.setState({crs: event.target.value});
  }

  handleSubmit(event)
  {
    this.crsCallback(this.state.crs);
    event.preventDefault();
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="Centre-align" type="text" value={this.state.crs} onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </label>
          </form>
        </div>
    );
  }
}

export default CrsForm;