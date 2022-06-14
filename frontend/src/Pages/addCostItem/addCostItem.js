import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import "./addCostItem.css";

function AddCostItem() {
    return (
        <div>
          <Form className="add-client-form-main">
            <h1 className="add-client-title">add Cost Item </h1>
            <Form.Group className="add-client-form-group" controlId="form-ItemSum">
              <label>Sum</label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Enter the sum of item"
              />
            </Form.Group>
      
            <Form.Group className="add-client-form-group" controlId="form-category">
              <label>Category</label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Enter the category"
              />
            </Form.Group>
      
            <Form.Group  className="add-client-form-group" controlId="form-description">
              <label>Description</label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Enter description"
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
export default AddCostItem;