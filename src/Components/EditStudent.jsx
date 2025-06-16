import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import './EditStudent.css'

const EditStudent = () => {
  const { studentid } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/students/" + studentid)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setPlace(data.place);
        setPhone(data.phone);
      })
      .catch((err) => console.log(err.message));
  }, [studentid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = { id, name, place, phone };

    fetch("http://localhost:8000/students/" + studentid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent)
    })
      .then(() => {
        alert("Student updated successfully!");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container">
      <h2>Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {id.length === 0 && validation && <span>Please Enter ID</span>}

        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {name.length === 0 && validation && <span>Please Enter Name</span>}

        <label>Place:</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {place.length === 0 && validation && <span>Please Enter Place</span>}

        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {phone.length === 0 && validation && <span>Please Enter Phone</span>}

        <div>
          <button type="submit">Update</button>
          <Link to="/"><button type="button">Back</button></Link>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
