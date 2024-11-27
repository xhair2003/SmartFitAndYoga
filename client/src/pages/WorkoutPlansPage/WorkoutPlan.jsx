import React, { useState } from "react";
import "./WorkoutPlan.css";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from "../../Components/Footer/Footer";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Dữ liệu bài tập
const workoutData = {
  Monday: [
    { 
      id: 1,
      name: "Push-ups", 
      sets: 3, 
      reps: 15, 
      description: "A classic upper body exercise to strengthen the chest, shoulders, and triceps.", 
      instructions: "Start in a plank position with hands shoulder-width apart. Lower your body until your chest almost touches the floor, then push back up." 
    },
    { 
      id: 2,
      name: "Squats", 
      sets: 4, 
      reps: 12, 
      description: "A lower body exercise to build leg and glute strength.", 
      instructions: "Stand with feet shoulder-width apart. Lower your hips as if sitting in a chair, keeping your back straight. Return to standing." 
    },
    { 
      id: 3,
      name: "Plank", 
      sets: 3, 
      reps: "30 seconds", 
      description: "A core-strengthening exercise to improve stability and endurance.", 
      instructions: "Start in a forearm plank position. Keep your body in a straight line from head to heels, engaging your core." 
    },
    
  ],
  Tuesday: [
    { 
      id: 4,
      name: "Pull-ups", 
      sets: 3, 
      reps: 8, 
      description: "A powerful upper body exercise to build back and arm strength.", 
      instructions: "Hang from a pull-up bar with palms facing forward. Pull your chin above the bar, then lower down with control." 
    },
    { 
      id: 5,
      name: "Lunges", 
      sets: 3, 
      reps: 10, 
      description: "A great exercise for strengthening legs and improving balance.", 
      instructions: "Step forward with one leg and lower your hips until both knees form 90-degree angles. Push back to starting position." 
    },
    { 
      id: 6,
      name: "Crunches", 
      sets: 3, 
      reps: 20, 
      description: "An abdominal exercise to strengthen your core.", 
      instructions: "Lie on your back with knees bent. Lift your shoulders off the ground by engaging your abs, then slowly lower back down." 
    },
  ],
  Wednesday: [
    { 
      id: 7,
      name: "Bench Press", 
      sets: 4, 
      reps: 10, 
      description: "A compound exercise to strengthen chest, shoulders, and triceps.", 
      instructions: "Lie on a bench holding a barbell. Lower the bar to your chest, then press it back up to the starting position." 
    },
    { 
      id: 8,
      name: "Deadlifts", 
      sets: 4, 
      reps: 8, 
      description: "A full-body exercise targeting the back, legs, and core.", 
      instructions: "Stand with feet hip-width apart. Bend at your hips to grab the barbell, then lift it by straightening your hips and knees." 
    },
    { 
      id: 9,
      name: "Overhead Press", 
      sets: 3, 
      reps: 12, 
      description: "A shoulder exercise to build strength and stability.", 
      instructions: "Hold a barbell at shoulder height. Press it overhead until your arms are fully extended, then lower back down." 
    },
  ],
  Thursday: [
    { 
      id: 10,
      name: "Bicep Curls", 
      sets: 3, 
      reps: 12, 
      description: "An isolation exercise to strengthen the biceps.", 
      instructions: "Hold a dumbbell in each hand. Curl the weights up to shoulder height, then lower them back down." 
    },
    { 
      id: 11,
      name: "Tricep Dips", 
      sets: 3, 
      reps: 12, 
      description: "A bodyweight exercise to target the triceps.", 
      instructions: "Sit on the edge of a bench with hands beside your hips. Slide off and lower your body, bending your elbows, then press back up." 
    },
    { 
      id: 12,
      name: "Shoulder Flys", 
      sets: 3, 
      reps: 10, 
      description: "An exercise to isolate and strengthen the shoulders.", 
      instructions: "Hold a dumbbell in each hand. Raise your arms out to the sides until shoulder height, then lower back down." 
    },
  ],
  Friday: [
    { 
      id: 13,
      name: "Mountain Climbers", 
      sets: 3, 
      reps: "30 seconds", 
      description: "A cardio exercise to strengthen the core and improve endurance.", 
      instructions: "Start in a plank position. Bring one knee to your chest, then switch legs quickly as if running in place." 
    },
    { 
      id: 14,
      name: "Jumping Jacks", 
      sets: 3, 
      reps: 20, 
      description: "A full-body exercise to improve cardiovascular fitness.", 
      instructions: "Jump your feet out and raise your arms overhead, then return to the starting position." 
    },
    { 
      id: 15,
      name: "Burpees", 
      sets: 3, 
      reps: 12, 
      description: "A high-intensity full-body exercise.", 
      instructions: "Start in a standing position. Drop into a squat, place hands on the ground, jump back to a plank, then jump back up." 
    },
  ],
  Saturday: [
    { 
      id: 16,
      name: "Yoga Stretching", 
      sets: 3, 
      reps: "10 minutes", 
      description: "A recovery exercise to enhance flexibility and relax muscles.", 
      instructions: "Perform a series of yoga poses like downward dog, child's pose, and cobra pose for 10 minutes." 
    },
    { 
      id: 17,
      name: "Side Plank", 
      sets: 3, 
      reps: "30 seconds", 
      description: "A core exercise to strengthen obliques and improve stability.", 
      instructions: "Lie on your side, propping up your body with one forearm. Hold your body in a straight line." 
    },
    { 
      id: 18,
      name: "Bicycle Crunches", 
      sets: 3, 
      reps: 20, 
      description: "A dynamic core exercise targeting the abs and obliques.", 
      instructions: "Lie on your back, bring opposite elbow to knee while alternating sides like pedaling a bike." 
    },
  ],
  Sunday: [
    { 
      id: 19,
      name: "Rest Day", 
      sets: 0, 
      reps: 0, 
      description: "A day for recovery to let your body rebuild and grow stronger.", 
      instructions: "Relax, hydrate, and focus on light stretching or meditation if needed." 
    },
  ],
};

const WorkoutPlan = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <div>
      <Navbar />
      <div className="workout-header">
        <h1>WORKOUT PLANS</h1>
      </div>
      <div className="workout-wrapper">
        <div className="workout-week-container">
          <ul className="workout-day-list">
            {days.map((day, index) => (
              <li 
                key={index} 
                className={`workout-day-item ${selectedDay === day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>
        <div className="workout-day-container">
          {selectedDay && (
            <>
              {workoutData[selectedDay].map(exercise => (
                <div 
                  key={exercise.id} 
                  className="workout-daily-item"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <h3>{exercise.name}</h3>
                  <p>Sets: {exercise.sets}, Reps: {exercise.reps}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {selectedExercise && (
        <div className="exercise-detail-modal">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{selectedExercise.name}</h2>
              <button className="close-btn" onClick={() => setSelectedExercise(null)}>&times;</button>
            </div>
            <div className="modal-content">
              <p><strong>Sets:</strong> {selectedExercise.sets}</p>
              <p><strong>Reps:</strong> {selectedExercise.reps}</p>
              <p><strong>Description:</strong> {selectedExercise.description}</p>
              <p><strong>Instructions:</strong> {selectedExercise.instructions}</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setSelectedExercise(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WorkoutPlan;