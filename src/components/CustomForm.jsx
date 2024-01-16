import React, { useState, useEffect } from 'react';
import './CustomForm.css'; // Import your CSS file

const CustomForm = ({ onFormSubmit, initialValues }) => {
  console.log("selectedState", initialValues)
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    dob: '',
    gender: '',
    city: '',
    email: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set initial values when provided (for editing)
    if (initialValues) {
      setFormData({ ...initialValues });
    }
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else {
      newErrors.name = 'true';
    }
  
    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
    } else {
      const dobDate = new Date(formData.dob);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - dobDate.getFullYear();
  
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old';
      } else {
        newErrors.dob = 'true';
      }
    }
  
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    } else {
      newErrors.gender = 'true';
    }
  
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else {
      newErrors.city = 'true';
    }
  
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    } else {
      newErrors.email = 'true';
    }
  
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else {
      newErrors.description = 'true';
    }
  
    setErrors(newErrors);
  
    return Object.values(newErrors).every((value) => value === 'true');
  };
  
  

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Update the validation status as the user types
    validateForm();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      onFormSubmit({ ...formData, id: formData.id || new Date().getTime() });
  
      // Reset the form data and validation status
      setFormData({
        id: null,
        name: '',
        dob: '',
        gender: '',
        city: '',
        email: '',
        description: '',
      });
  
      setErrors({
        name: '',
        dob: '',
        gender: '',
        city: '',
        email: '',
        description: '',
      });
    }
  };
  

  const getValidationIcon = (field) => {
    if (errors[field] === 'true') {
      return <span className="validation-icon">&#10004;</span>;
    }
    return null;
  };

  return (
    <div className="custom-form-container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {getValidationIcon('name')}
          {errors.name !== 'true' && (
            <span className="error">{errors.name}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
          {getValidationIcon('dob')}
          {errors.dob !== 'true' && (
            <span className="error">{errors.dob}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {getValidationIcon('gender')}
          {errors.gender !== 'true' && (
            <span className="error">{errors.gender}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          {getValidationIcon('city')}
          {errors.city !== 'true' && (
            <span className="error">{errors.city}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {getValidationIcon('email')}
          {errors.email !== 'true' && (
            <span className="error">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {getValidationIcon('description')}
          {errors.description !== 'true' && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
