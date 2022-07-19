import React, { Component } from 'react';

import moment from 'moment';

class ResultDisplay extends Component {
    render() { 
      const partial = this.props.results.partial_set ? <span className="badge badge-info">PARTIAL OBS</span> : '';
      const due_moment = moment(this.props.results.time_next_obs_set_due);
      let nextDueSummary = due_moment.fromNow();
      if (nextDueSummary === "a few seconds ago") {
        nextDueSummary = "now";
      }
      const isSameDay = due_moment.isSame(new Date(), "day");
      const nextDueTime = due_moment.format("hh:mm:ss a");
      const completeDue = nextDueSummary + " (" + (isSameDay ? "today" : "tomorrow") + " at " + nextDueTime + ")";
      return (
            <div>
                <div className="card">
                    <div className="card-header">
                        Results
                    </div>
                    <div className="d-flex flex-row">
                        <img src="https://pbs.twimg.com/profile_images/979471253395341312/zE28a1Vn_400x400.jpg" alt="DOCTOR Jan Itor." />
                        <div className="card-body">
                            <h5 className="card-title">Overall severity: {this.props.results.overall_severity}</h5>
                            <h5 className="card-title">Next obs due: {completeDue}</h5>
                            <h5 className="card-title">Overall score: {this.props.results.overall_score}</h5>
                            <h5 className="card-title">{partial}</h5>
                            <p className="card-text">Score breakdown:</p>
                            <ul className="card-text">
                                <li>blood pressure score: {this.props.results.blood_pressure_score}</li>
                                <li>consciousness score: {this.props.results.consciousness_score}</li>
                                <li>heart rate score: {this.props.results.heart_rate_score}</li>
                                <li>o2 therapy score: {this.props.results.o2_therapy_score}</li>
                                <li>oxygen saturation score: {this.props.results.oxygen_saturation_score}</li>
                                <li>respiratory rate score: {this.props.results.respiratory_rate_score}</li>
                                <li>temperature score: {this.props.results.temperature_score}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  };

export default ResultDisplay;
