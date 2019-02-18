import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

function Clock(props) {
  return (
      <div className="Clock Centre-align">
        <h3>{new Date().toLocaleTimeString()}</h3>
      </div>

  );
}

function tick()
{
  ReactDOM.render(
      (
          <div>
            <Clock/>
            <App />
          </div>
      ), document.getElementById('root'));
}

setInterval(tick, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
