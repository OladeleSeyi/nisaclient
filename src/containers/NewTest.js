import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Test.css";

export default function NewTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [testName, settestName] = useState("");
  const [patientName, setpatientName] = useState("");
  const [patientId, setpatientId] = useState("");
  const [patientEmail, setpatientEmail] = useState("");
  const [date, setdate] = useState("");
  const [issuerName, setissuerName] = useState("");
  const [issuerRemarks, setissuerRemarks] = useState("");
  const [button, setbutton] = useState({
    text: "Request Test",
    variant: "primary",
  });

  async function request(data) {
    let fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = "/labs/test";
    try {
      let request = await fetch(url, fetchOptions);
      if (request.status === 200) {
        setbutton({
          text: "Request sent",
          variant: "success",
        });
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setbutton({
        text: "Request Failed",
        variant: "danger",
      });
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    let data = {
      testName,
      patientName,
      patientId,
      patientEmail,
      date,
      issuerName,
      issuerRemarks,
    };
    request(data);
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="testName" bsSize="large">
          <ControlLabel>Test Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            name="testName"
            value={testName}
            onChange={(e) => settestName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="patientName" bsSize="large">
          <ControlLabel>Patient Name</ControlLabel>
          <FormControl
            value={patientName}
            onChange={(e) => setpatientName(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="patientId" bsSize="large">
          <ControlLabel>Patient Id</ControlLabel>
          <FormControl
            value={patientId}
            onChange={(e) => setpatientId(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="patientEmail" bsSize="large">
          <ControlLabel>Patient Email</ControlLabel>
          <FormControl
            value={patientEmail}
            onChange={(e) => setpatientEmail(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="date" bsSize="large">
          <ControlLabel>Date</ControlLabel>
          <FormControl
            value={date}
            onChange={(e) => setdate(e.target.value)}
            type="date"
          />
        </FormGroup>
        <FormGroup controlId="issuerName" bsSize="large">
          <ControlLabel>Doctor</ControlLabel>
          <FormControl
            value={issuerName}
            onChange={(e) => setissuerName(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="issuerRemarks" bsSize="large">
          <ControlLabel>Remarks</ControlLabel>
          <FormControl
            value={issuerRemarks}
            onChange={(e) => setissuerRemarks(e.target.value)}
            type="text"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          bsStyle={button.variant}
          isLoading={isLoading}
          type="submit"
        >
          {button.text}
        </LoaderButton>
      </form>
    </div>
  );
}
