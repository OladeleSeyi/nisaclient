import React, { useState, useEffect } from "react";
import { PageHeader, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Test.css";
export default function Record() {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function renderTestList(records) {
    console.log("records", records);
    return (
      <tbody>
        {records.map((test, i) => {
          return (
            <LinkContainer to={`/test/${test._id}`} key={test._id}>
              <tr className={test.completed ? "success" : "warning"}>
                <td>{test.issuerName}</td>
                <td>{test.patientName}</td>
                <td>{test.testName}</td>
                <td>{test.result}</td>
                <td>{test.completed ? "Completed" : "Pending"}</td>
              </tr>
            </LinkContainer>
          );
        })}
      </tbody>
    );
  }
  const getTests = async (data) => {
    // Data here represents whether or not we want to get all notes or just some of them
    let url = "/labs/tests";
    try {
      const request = await fetch(url);
      const response = await request.json();
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  function renderTests() {
    return (
      <div className="notes">
        <PageHeader>Your Tests</PageHeader>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patients Name</th>
              <th>Test</th>
              <th>Report</th>
              <th>completed</th>
            </tr>
          </thead>
          {!isLoading && renderTestList(tests)}
        </Table>
      </div>
    );
  }

  useEffect(() => {
    async function onLoad() {
      let tests = await getTests();

      setTests(tests);

      setIsLoading(false);
    }

    onLoad();
  }, []);

  return <div className="Home">{renderTests()}</div>;
}
