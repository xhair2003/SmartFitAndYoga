// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import './CreatePageStyles.css';

// const CreatePage = () => {
//   const [formData, setFormData] = useState({
//     age: "",
//     weight: "",
//     height: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   // Assume you have a function to get the token (e.g., from localStorage)
//   const getToken = () => localStorage.getItem("token"); // Replace this with your token retrieval logic

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     if (!formData.age || !formData.height || !formData.weight) {
//       alert("Please fill in all the required fields.");
//       return;
//     }

//     // Prepare the data payload
//     const payload = {
//       age: parseInt(formData.age, 10),
//       weight: parseFloat(formData.weight),
//       height: parseFloat(formData.height),
//     };

//     try {
//       setLoading(true);
//       setError(null);

//       // Retrieve the token
//       const token = getToken();
//       if (!token) {
//         throw new Error("Token is missing. Please log in again.");
//       }

//       // Call the API using axios
//       const response = await axios.post(
//         "http://localhost:5000/api/meal-plans",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Add token here
//           },
//         }
//       );

//       console.log("Meal plan generated:", response.data);

//       // Navigate to the next page with the meal plan data
//       navigate("/plans", { state: { mealPlan: response.data } });
//     } catch (err) {
//       console.error("Error generating meal plan:", err);
//       setError("Failed to generate meal plan. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="meal-plan-container">
//       <div className="meal-plan-header">
//         <h1>Create your plan</h1>
//         <p>
//           Please provide your age, weight, and height to generate a tailored meal plan.
//         </p>
//       </div>
//       <form className="meal-plan-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={formData.age}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="height"
//             placeholder="Height (Centimeters)"
//             value={formData.height}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="weight"
//             placeholder="Weight (KG)"
//             value={formData.weight}
//             onChange={handleChange}
//           />
//         </div>
//         {loading && <p>Loading...</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit" className="generate-button" disabled={loading}>
//           Generate meal plan
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePage;

import React, { useState } from "react";
import Stepper from "../../Components/Stepper/Stepper"; // Import Stepper
import './CreatePageStyles.css';
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    sex: "Male",
    goal: "Build Muscle",
    allergies: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true); // Bật trạng thái xử lý
    console.log("Form Data Submitted: ", formData);

    // Giả lập xử lý dữ liệu hoặc gọi API
    setTimeout(() => {
      setIsSubmitting(false); // Tắt trạng thái xử lý
      navigate("/loading"); // Điều hướng đến Loading Page
    }, 3000); // Thời gian giả lập xử lý 3 giây
  };

  return (
    <div className="container">
      <Stepper currentStep={1} />
      <h1>Create Your Plan</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (Centimeters)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Enter your height"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (KG)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter your weight"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Sex</label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="goal">Goal and Aspiration</label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >
            <option value="Build Muscle">Build Muscle</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Maintain Weight">Maintain Weight</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="allergies">Allergies or Ingredients to Avoid</label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="List any allergies or ingredients to avoid"
          ></textarea>
        </div>
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Generating..." : "Generate Plan"}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
