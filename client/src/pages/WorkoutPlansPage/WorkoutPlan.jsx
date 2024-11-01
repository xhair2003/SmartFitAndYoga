import React, { useState } from "react";
import * as S from "./WorkoutPlanStyles";

const workoutData = {
  Monday: [
    { title: "Chest & Back", duration: "45 min" },
    { title: "Cardio", duration: "30 min" },
    { title: "Core Workout", duration: "20 min" },
  ],
  Tuesday: [
    { title: "Legs", duration: "60 min" },
    { title: "HIIT", duration: "25 min" },
  ],
  Wednesday: [
    { title: "Yoga", duration: "60 min" },
    { title: "Swimming", duration: "45 min" },
  ],
  Thursday: [
    { title: "Arms & Shoulders", duration: "50 min" },
    { title: "Running", duration: "30 min" },
  ],
  Friday: [
    { title: "Full Body Strength", duration: "60 min" },
    { title: "Stretching", duration: "20 min" },
  ],
  Saturday: [
    { title: "Cycling", duration: "90 min" },
    { title: "Core Workout", duration: "30 min" },
  ],
  Sunday: [
    { title: "Rest Day", duration: "0 min" },
    { title: "Light Stretching", duration: "15 min" },
  ],
};

const WorkoutPlan = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const selectedDayWorkouts = workoutData[selectedDay] || [];

  return (
    <S.PageContainer>
      <S.Title>Workout Plan</S.Title>
      <S.ContentWrapper>
        <S.DaySelector>
          {Object.keys(workoutData).map((day) => (
            <S.DayButton
              key={day}
              onClick={() => setSelectedDay(day)}
              isSelected={selectedDay === day}
            >
              {day}
            </S.DayButton>
          ))}
        </S.DaySelector>
        <S.PlanGrid>
          {selectedDayWorkouts.map((workout, index) => (
            <S.PlanCard key={index}>
              <S.CardTitle>{workout.title}</S.CardTitle>
              <S.CardDuration>{workout.duration}</S.CardDuration>
            </S.PlanCard>
          ))}
        </S.PlanGrid>
      </S.ContentWrapper>
      <S.DateSection>
        <S.DateItem>Selected Day: {selectedDay}</S.DateItem>
      </S.DateSection>
    </S.PageContainer>
  );
};

export default WorkoutPlan;
