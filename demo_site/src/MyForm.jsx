import React, { Component } from 'react';
import { Form, Field } from 'easy-react-form';

class MyForm extends Component {

  render() {


    return (
      <Form onSubmit={values => this.props.handleSubmit(values)}>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label target="respiratory_rate">Respiratory rate</label>
              <Field className="form-control"
                name="respiratory_rate"
                component="input"
                type="number"
                placeholder="Enter respiratory rate" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label target="oxygen_saturation">Oxygen saturation</label>
              <Field className="form-control"
                name="oxygen_saturation"
                component="input"
                type="number"
                placeholder="Enter oxygen saturation" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label target="o2_therapy">O2 therapy</label>
              <Field className="form-control"
                name="o2_therapy"
                component="input"
                type="number"
                placeholder="Enter O2 therapy" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <label target="systolic_blood_pressure">Systolic blood pressure</label>
              <Field className="form-control"
                name="systolic_blood_pressure"
                component="input"
                type="number"
                placeholder="Enter systolic blood pressure" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label target="temperature">Temperature</label>
              <Field className="form-control"
                name="temperature"
                component="input"
                type="number"
                placeholder="Enter temperature" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <label target="heart_rate">Heart rate</label>
              <Field className="form-control"
                name="heart_rate"
                component="input"
                type="number"
                placeholder="Enter heart rate" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label target="spo2_scale">SpO2 scale</label>
              <Field className="form-control"
                name="spo2_scale"
                component="select"
                value={1}>
                <option value="1">1</option>
                <option value="2">2</option>
              </Field>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <label target="o2_therapy_mask">O2 therapy mask</label>
              <Field className="form-control"
                name="o2_therapy_mask"
                component="select">
                <option value="undefined">Please select a mask</option>
                <option value="Room Air">Room Air</option>
                <option value="Venturi">Venturi</option>
                <option value="Humidified">Humidified</option>
                <option value="Nasal Cann.">Nasal Cann.</option>
                <option value="Simple">Simple</option>
                <option value="Resv Mask">Resv Mask</option>
                <option value="CPAP">CPAP</option>
                <option value="NIV">NIV</option>
                <option value="High Flow">High Flow</option>
              </Field>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <div className="form-group">
              <label target="consciousness_acvpu">ACVPU</label>
              <Field className="form-control"
                name="consciousness_acvpu"
                component="select">
                <option value="">None</option>
                <option value="Alert">Alert</option>
                <option value="confusion">confusion</option>
                <option value="voice">voice</option>
                <option value="pain">pain</option>
                <option value="unresponsive">unresponsive</option>
              </Field>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <div className="form-group">
              <button className="btn btn-secondary" disabled={false}> Submit </button>
            </div>
          </div>
        </div>
      </Form >
    )
  }
};

export default MyForm;
