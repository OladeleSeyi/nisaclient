import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Jumbotron,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default function Test() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [labTech, setLabTech] = useState("");
  const [labRemarks, setLabRemarks] = useState("");
  const [result, setResult] = useState("");
  const [button, setbutton] = useState({
    text: "Update Test Results",
    variant: "primary",
  });

  useEffect(() => {
    async function loadTest() {
      const url = `/labs/test/${id}`;
      const request = await fetch(url);
      const test = await request.json();
      console.log(test);
      return test;
    }

    async function onLoad() {
      try {
        const test = await loadTest();
        const { data } = test;
        console.log(data);
        setTest(data);
      } catch (e) {
        console.log(e);
        setTest([]);
      }
    }

    onLoad();
  }, [id]);

  async function request(data) {
    const fetchOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = `/labs/test/${id}`;
    console.log(url);
    try {
      let request = await fetch(url, fetchOptions);
      if (request.status === 200) {
        setbutton({
          text: "Test Updated",
          variant: "success",
        });
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setbutton({
        text: "Update Failed",
        variant: "danger",
      });
      setIsLoading(false);
    }
  }
  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    let requestData = {
      data: {
        labTech,
        labRemarks,
        result,
        completed: true,
      },
    };

    request(requestData);
  }
  return (
    <div className="Notes">
      {test && (
        <Jumbotron>
          <h3>Test Completion Form </h3>
          <p>Please update this form on completion</p>
          <p>Test: {test.testName}</p>

          <p>Doctor's Remarks : {test.issuerRemarks}</p>

          <form onSubmit={handleSubmit}>
            <FormGroup controlId="labTech">
              <ControlLabel>Short Result</ControlLabel>
              <FormControl
                value={result}
                placeholder="positive/negative"
                onChange={(e) => setResult(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="labRemarks">
              <ControlLabel>Remarks</ControlLabel>
              <FormControl
                value={labRemarks}
                componentClass="textarea"
                onChange={(e) => setLabRemarks(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="labTech">
              <ControlLabel>Testing Officer</ControlLabel>
              <FormControl
                value={labTech}
                onChange={(e) => setLabTech(e.target.value)}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              bsStyle={button.variant}
              isLoading={isLoading}
            >
              {button.text}
            </LoaderButton>
          </form>
        </Jumbotron>
      )}
    </div>
  );
}
