import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import DataTable from "./DataTable";
import "../App.css";

// Mock API responses
const apiResponses = {
  "User Information": {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
    ],
  },
  "Address Information": {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      {
        name: "state",
        type: "dropdown",
        label: "State",
        options: ["California", "Texas", "New York"],
        required: true,
      },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  "Payment Information": {
    fields: [
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      {
        name: "cardholderName",
        type: "text",
        label: "Cardholder Name",
        required: true,
      },
    ],
  },
};

const DynamicForm = () => {
  // State Definitions
  const [selectedForm, setSelectedForm] = useState("User Information");
  const [formStructure, setFormStructure] = useState([]);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Load form structure based on selected form
  useEffect(() => {
    if (selectedForm) {
      const { fields } = apiResponses[selectedForm];
      setFormStructure(fields);
      resetForm();
    }
  }, [selectedForm]);

  // Reset form states
  const resetForm = () => {
    setFormData({});
    setErrors({});
    setProgress(0);
  };

  // Handle input changes and update progress
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    updateProgress(updatedData);
  };

  const updateProgress = (data) => {
    const completedFields = Object.entries(data).filter(
      ([key, val]) =>
        formStructure.find((field) => field.name === key)?.required && val.trim()
    ).length;
    const requiredFields = formStructure.filter((field) => field.required).length;
    setProgress((completedFields / requiredFields) * 100);
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    formStructure.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData([...submittedData, formData]);
      resetForm();
      setSuccessMessage("Form submitted successfully!");
    }
  };

  // Handle deletion of a submitted entry
  const handleDelete = (index) => {
    setSubmittedData(submittedData.filter((_, i) => i !== index));
    setSuccessMessage("Entry deleted successfully!");
  };

  // Handle edit save functionality
  const handleEditSave = (index) => {
    setSuccessMessage("Changes saved successfully!");
  };

  // Render form fields dynamically
  const renderFormFields = () =>
    formStructure.map((field) => (
      <div key={field.name}>
        <label className="block text-sm font-medium text-white">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        {field.type === "dropdown" ? (
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded-lg p-2"
          >
            <option value="">Select</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded-lg p-2"
          />
        )}
        {errors[field.name] && (
          <p className="text-red-500 text-sm">{errors[field.name]}</p>
        )}
      </div>
    ));

  return (
    <motion.div
      className="min-h-screen p-8 bg-[#050913] relative w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Rendiring Blurred Divs */}
      {/* First Gradient Div - Fixed Top-Left */}
      <motion.div
        className="absolute rounded-full blur-[200px] pointer-events-none animate-gradient-motion"
        style={{
          width: "300px",
          height: "300px",
          background: "linear-gradient(45deg, #6600ff, #ff0080, #00ccff, #ffcc00)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          left: 0, // Fixed 20px from the left
          top: 0,  // Fixed 20px from the top
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>

      {/* Second Gradient Div - Fixed Bottom-Right */}
      <motion.div
        className="absolute rounded-full blur-[200px] pointer-events-none animate-gradient-motion"
        style={{
          width: "300px",
          height: "300px",
          background: "linear-gradient(45deg, #ffcc00, #00ccff, #ff0080, #6600ff)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          right: 20, // Fixed 20px from the right
          bottom: 120, // Fixed 20px from the bottom
        }}

      ></motion.div>

      <motion.div className="max-w-xl mx-auto p-6 bg-white/5 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Dynamic Form</h2>

        {successMessage && (
          <motion.div className="text-green-600 font-semibold mb-4 text-center">
            {successMessage}
          </motion.div>
        )}

        {/* Form Selection Dropdown */}
        <select
          onChange={(e) => setSelectedForm(e.target.value)}
          value={selectedForm}
          className="w-full border rounded-full px-4 py-2 mb-6 bg-white"
        >
          {Object.keys(apiResponses).map((formType) => (
            <option key={formType} value={formType}>
              {formType}
            </option>
          ))}
        </select>

        {/* Form Fields */}
        {formStructure.length > 0 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <ProgressBar progress={progress} />
            {renderFormFields()}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              Submit
            </button>
          </form>
        )}

        {/* Submitted Data */}
        {submittedData.length > 0 && (
          <DataTable
            data={submittedData}
            onEdit={handleEditSave}
            onDelete={handleDelete}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default DynamicForm;
