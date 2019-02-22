import React from 'react';

class CrsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: "MTB"};
    this.locationCallback = props.locationCallback;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
  {
    this.setState({value: event.target.value});
  }

  handleSubmit(event)
  {
    this.locationCallback(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="Centre-align" type="text" value={this.state.value} onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </label>
          </form>
        </div>
    );
  }
}

export default CrsForm;