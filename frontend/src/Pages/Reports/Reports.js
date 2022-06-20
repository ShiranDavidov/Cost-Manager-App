import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import "../addCostItem/addCostItem.css"

function GetReport() {
    return (
        <div>
          <Form className="add-client-form-main">
            <h1 className="add-client-title">Get Detailed Report</h1>
            <Form.Group className="add-client-form-group" controlId="form-ItemSum">
              <label>Month</label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Enter Month"
              />
            </Form.Group>
      
            <Form.Group className="add-client-form-group" controlId="form-category">
              <label>Year</label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Enter year"
              />
            </Form.Group>

            <Form.Group  className="add-client-form-group" controlId="form-userID">
              <label>User ID</label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Enter your user ID"
              />
            </Form.Group>
  
            <Button className="submit" size="sm" variant="light" block type="submit">
              Submit
            </Button>
          </Form>   
        </div>
    );
}
export default GetReport;