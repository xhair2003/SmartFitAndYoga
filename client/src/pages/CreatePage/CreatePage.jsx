import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './CreatePageStyles.css';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Assume you have a function to get the token (e.g., from localStorage)
  const getToken = () => localStorage.getItem("token"); // Replace this with your token retrieval logic

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!formData.age || !formData.height || !formData.weight) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Prepare the data payload
    const payload = {
      age: parseInt(formData.age, 10),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
    };

    try {
      setLoading(true);
      setError(null);

      // Retrieve the token
      const token = getToken();
      if (!token) {
        throw new Error("Token is missing. Please log in again.");
      }

      // Call the API using axios
      const response = await axios.post(
        "http://localhost:5000/api/meal-plans",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token here
          },
        }
      );

      console.log("Meal plan generated:", response.data);

      // Navigate to the next page with the meal plan data
      navigate("/plans", { state: { mealPlan: response.data } });
    } catch (err) {
      console.error("Error generating meal plan:", err);
      setError("Failed to generate meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meal-plan-container">
      <div className="meal-plan-header">
        <h1>Create your plan</h1>
        <p>
          Please provide your age, weight, and height to generate a tailored meal plan.
        </p>
      </div>
      <form className="meal-plan-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            type="number"
            name="height"
            placeholder="Height (Centimeters)"
            value={formData.height}
            onChange={handleChange}
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (KG)"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="generate-button" disabled={loading}>
          Generate meal plan
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
