import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import "./addCostItem.css";

async function uploadNewCostAPI(NewCost) {
  console.log("before api signip")
  return fetch("http://localhost:3000/costs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(NewCost),
  }).then((res) => {
    if (res.ok) {
      console.log("New Cost accept")
      return res.json();
    }
  });
}
function AddCostItem() {
  const [inputList, setInputList] = useState([{ sum: "", category: "", userId:"" ,description: "" }]);

  const [text, setText] = useState();
  
  const[itemSum,setItemSum]= useState();
  const[category,setCategory]= useState();
  const[userId,setuUserId]= useState();
  const[description,setDescription]= useState();
  
const handleChangeItemSum = async (event) => {
    event.preventDefault();
    setItemSum(event.target.value);
  };

  const handleChangeCategory = async (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  };
  const handleChangeUserId = async (event) => {
    event.preventDefault();
    setuUserId(event.target.value);
  };
  const handleChangeDescription = async (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    var NewCost = {
        sum : itemSum,
        category: category,
        userId: userId,
        description: description,
    }

    const response = await uploadNewCostAPI(NewCost);
    if (response){
        setText("the new cost added successfuly!")
        setInputList([{ sum: "", category: "", userId:"" ,description: "" }]);
        setItemSum("");
        setCategory("");
        setuUserId("");
        setDescription("");
    }
    else
    {
        setItemSum("");
        setCategory("");
        setuUserId("");
        setDescription("");
        setInputList([{ sum: "", category: "", userId:"" ,description: "" }]);
    }
  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { sum: "", category: "", userId:"" ,description: "" }]);
  };

  return (
    <div>
      <Form className="add-client-form-main">
        <h1 className="add-client-title">add Cost Item </h1>
        <Form.Group className="add-client-form-group" controlId="form-ItemSum">
          <label>Sum</label>
          <Form.Control
            className="input"
            type="text"
            value={itemSum}
            onChange={handleChangeItemSum}
            placeholder="Enter the sum of item"
          required />
        </Form.Group>
  
        <Form.Group className="add-client-form-group" controlId="form-category">
          <label>Category</label>
          <Form.Control
            className="input"
            type="text"
            value={category}
            onChange={handleChangeCategory}
            placeholder="Enter the category"
          required />
        </Form.Group>
  
        <Form.Group  className="add-client-form-group" controlId="form-description">
          <label>Description</label>
          <Form.Control
            className="input"
            type="text"
            value={description}
            onChange={handleChangeDescription}
            placeholder="Enter description"
          required />
        </Form.Group>
        <Form.Group  className="add-client-form-group" controlId="form-userID">
          <label>User ID</label>
          <Form.Control
            className="input"
            type="text"
            value={userId}
            onChange={handleChangeUserId}
            placeholder="Enter your user ID"
          required />
        </Form.Group>

        {/* <div className="submit">
          <input type="submit" value="Send" onClick={handleSubmit}/>
        </div> */}
        <Button className="submit"  size="sm" variant="light" block type="submit" onClick={handleSubmit}>
              Submit
            </Button>
      </Form>   
    </div>
  );
}
export default AddCostItem;