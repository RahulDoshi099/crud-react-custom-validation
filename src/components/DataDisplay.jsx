import React from 'react';
import './Datadisplay.css'; // Import your CSS file

const DataDisplay = ({ items, onEdit, onDelete }) => {
  return (
    <div className="data-display-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>City</th>
            <th>Email</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.dob}</td>
              <td>{item.gender}</td>
              <td>{item.city}</td>
              <td>{item.email}</td>
              <td>{item.description}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(item.id)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
