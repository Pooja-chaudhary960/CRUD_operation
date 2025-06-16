import React, { useEffect, useState } from "react";
import './StudenTable.css';
import { Link, useNavigate } from "react-router-dom";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Navigate to student view details page
  const DispalyDetails = (id) => {
    navigate("/student/view/" + id);
  };

  // Navigate to student edit page
  const EditDeatils = (id) => {
    navigate("/student/edit/" + id);
  };
  const RemoveDetails=(id)=>{
    if(window.confirm("Are you sure you want to delete?")){
      fetch("http://localhost:8000/students/" + id, {
      method: "DELETE",
    })
      .then(() => {
        alert(" Remove Student Data successfully!");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  }
    };

  useEffect(() => {
    fetch('http://localhost:8000/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <div className="container"></div>
      <h2>Student Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-add">Add new Student</Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button onClick={() => DispalyDetails(item.id)} className="btn btn-info">View</button>
                    <button onClick={() => EditDeatils(item.id)} className="btn btn-primary">Edit</button>
                    <button onClick={()=>
                      {RemoveDetails(item.id)}} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentTable;
