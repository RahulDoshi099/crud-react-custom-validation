import React, { useState } from 'react';
import './App.css'; 
import CustomForm from './components/CustomForm';
import DataDisplay from './components/DataDisplay';

const App = () => {
  const [items, setItems] = useState([]);
  console.log("items", items)
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleFormSubmit = (formData) => {
    if (selectedItemId === null) {
      // Add new item
      setItems([...items, formData]);
    } else {
      // Edit existing item
      const updatedItems = items.map((item) =>
        item.id === selectedItemId ? formData : item
      );
      setItems(updatedItems);
      setSelectedItemId(null);
    }
    setSelectedState(null);
  };

  const handleEdit = (id) => {
    setSelectedItemId(id);
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedState(selectedItem); 
    }
  };

  const handleDelete = (id) => {
    // Delete item logic
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    // Reset selectedState after item deletion
    setSelectedState(null);
  };

  return (
    <div>
      <CustomForm
        onFormSubmit={handleFormSubmit}
        initialValues={selectedState}
      />
      <DataDisplay items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
