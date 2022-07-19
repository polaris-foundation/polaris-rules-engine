import React, { Component } from 'react';
import moment from 'moment';
import {Helmet} from "react-helmet";
import 'bootstrap/dist/css/bootstrap.css'

import MyForm from './MyForm.jsx'
import ResultDisplay from './ResultDisplay.jsx'

const NEWS2_CONFIG = {
  "zero_severity_interval_hours": 12,
  "low_severity_interval_hours": 6,
  "low_medium_severity_interval_hours": 1,
  "medium_severity_interval_hours": 1,
  "high_severity_interval_hours": 0
};

const NEWS2_OBS_NUMERIC = ["respiratory_rate", "oxygen_saturation", "o2_therapy", "systolic_blood_pressure", "temperature", "heart_rate", "spo2_scale"];
const NEWS2_OBS_STRING = ["o2_therapy_mask", "consciousness_acvpu", "time"];
const NEWS_OBS_ALL = NEWS2_OBS_NUMERIC.concat(NEWS2_OBS_STRING);

class App extends Component {
  constructor() {
    super();
    this.state = {
      news2Result: null
    };
  }

  handleSubmit(values) {
    this.setState((state) => {
      return {news2Result: null};
    });
    console.log("Values in", values);
    /* Remove default values String values to int */
    const clean_obs = {};
    for(var i = 0; i < NEWS_OBS_ALL.length; i++) {
      const obs_type = NEWS_OBS_ALL[i];
      const obs_value = values[obs_type];

      if (obs_value === null || typeof obs_value === "undefined" || obs_value === "") continue;

      if (NEWS2_OBS_NUMERIC.includes(obs_type)) {
        clean_obs[obs_type] = parseInt(values[obs_type]);
      } else {
        clean_obs[obs_type] = values[obs_type];
      }
    }

    // Add extras
    clean_obs["time"] = moment().toISOString();
    clean_obs["config"] = NEWS2_CONFIG;

    console.log(clean_obs);

    window.scoreObsSetNews2(clean_obs)
      .then((result) => {
        console.log(result);

        this.setState((state) => {
          return {news2Result: result};
        });
      });
  }


  render() {
    const result = this.state.news2Result == null ? '' : <ResultDisplay results={this.state.news2Result} />;

    return (
      <div id="application" style={{marginTop: 10}}>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Demo scoring systems</title>
                <script src="http://localhost:3000/rule_definition/scoreObsSetNews2.bundle.js"></script>
                <script>
                  const moment = window.moment;
                </script>
        </Helmet>

        <div className="container">
          <h1>NEWS2 scoring</h1>
          <MyForm handleSubmit={(values)=>this.handleSubmit(values)} />
          {result}
        </div >
      </div>
    )
  }
}

export default App;
