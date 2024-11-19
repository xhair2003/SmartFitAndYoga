import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreatePageStyles.css';


const CreatePage = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    sex: "Male",
    goal: "Build Muscle",
    mealsPerDay: "2",
    //diet: "Anything",
    includeSnacks: false,
    allergies: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    navigate("/loading");
  };

  return (
    <div className="meal-plan-container">
      <div className="meal-plan-header">
        <div className="progress-bar">
          <span className="step active">1</span>
          <span className="line"></span>
          <span className="step">2</span>
          <span className="line"></span>
          <span className="step">3</span>
        </div>
        <h1>Create your plan</h1>
        <p>
          We just need some vital information about yourself and your dietary
          goals and needs to tailor a specific meal plan just for you.
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
        <div className="form-group">
          <select name="sex" value={formData.sex} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select name="goal" value={formData.goal} onChange={handleChange}>
            <option value="Build Muscle">Build Muscle</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Maintain Weight">Maintain Weight</option>
          </select>
          <select
            name="mealsPerDay"
            value={formData.mealsPerDay}
            onChange={handleChange}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="form-group">
          <select name="diet" value={formData.diet} onChange={handleChange}>
            <option value="Anything">Anything</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Keto">Keto</option>
          </select>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="includeSnacks"
              checked={formData.includeSnacks}
              onChange={handleChange}
            />
            <label>Include Snacks?</label>
          </div>
        </div>
        <div className="form-group">
          <textarea
            name="allergies"
            placeholder="Any allergies or ingredients you don't want to see in your meals?"
            value={formData.allergies}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="generate-button">
          Generate meal plan
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
