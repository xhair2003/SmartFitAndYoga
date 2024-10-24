import React, { useState, useRef } from 'react';
import * as S from './NutritionPlanStyles';
import './NutritionPlan.css';
// import { div } from 'framer-motion/client';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const NutritionPlan = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredDay, setHoveredDay] = useState(null);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dailyDetails = {
    calories: 2333,
    protein: 150,
    carbs: 193,
    fat: 106,
  };

  const meals = [
    {
      name: 'Bún chả',
      type: 'Bữa trưa',
      ingredients: [
        '200g bún',
        '150g thịt lợn nướng',
        '50g chả',
        '100g rau sống',
        '30ml nước mắm pha',
      ],
      nutrition: { calories: 550, protein: 30, carbs: 65, fat: 20 },
      chefNote: 'Nướng thịt trước khi ăn để có hương vị thơm ngon nhất.',
    },
    {
      name: 'Phở gà',
      type: 'Bữa sáng',
      ingredients: [
        '200g bánh phở',
        '150g thịt gà',
        '1 lít nước dùng gà',
        '50g hành, ngò',
        '20g giá đỗ',
      ],
      nutrition: { calories: 450, protein: 25, carbs: 60, fat: 15 },
      chefNote: 'Nêm nếm nước dùng vừa ăn trước khi phục vụ.',
    },
    {
      name: 'Cơm tấm sườn nướng',
      type: 'Bữa tối',
      ingredients: [
        '200g cơm tấm',
        '150g sườn nướng',
        '1 quả trứng ốp la',
        '50g đồ chua',
        '30ml nước mắm pha',
      ],
      nutrition: { calories: 650, protein: 35, carbs: 70, fat: 25 },
      chefNote: 'Ướp sườn với gia vị trước khi nướng để tăng hương vị.',
    },
  ];

  const dayListRef = useRef(null);

  return (
    <div>
    <Navbar />
    <S.PageContainer>
      <S.Title>Nutrition Plan</S.Title>
      <S.ContentContainer>
        <S.Sidebar>
          <S.DailyDetails>
            <S.SectionTitle>The daily details</S.SectionTitle>
            <S.NutritionGrid>
              <S.NutritionItem bgColor="#FFE4E1">
                <span>{dailyDetails.calories}</span>
                <span>Calories</span>
              </S.NutritionItem>
              <S.NutritionItem bgColor="#E6E6FA">
                <span>{dailyDetails.protein}g</span>
                <span>Protein</span>
              </S.NutritionItem>
              <S.NutritionItem bgColor="#E0FFF0">
                <span>{dailyDetails.carbs}g</span>
                <span>Carbs</span>
              </S.NutritionItem>
              <S.NutritionItem bgColor="#FFFACD">
                <span>{dailyDetails.fat}g</span>
                <span>Fat</span>
              </S.NutritionItem>
            </S.NutritionGrid>
          </S.DailyDetails>
          <S.DaysOfWeek>
            <S.SectionTitle>Days of the week</S.SectionTitle>
            <S.DayList ref={dayListRef}>
              {days.map((day, index) => (
                <S.DayItem
                  key={index}
                  active={index === activeDay}
                  hovered={index === hoveredDay}
                  onClick={() => setActiveDay(index)}
                  onMouseEnter={() => setHoveredDay(index)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  {day}
                </S.DayItem>
              ))}
            </S.DayList>
            <S.Button>Weekly ingredients list</S.Button>
            <S.Button>Create another meal plan</S.Button>
          </S.DaysOfWeek>
        </S.Sidebar>
        <S.MealsContainer>
          {meals.map((meal, index) => (
            <S.MealCard key={index}>
              <S.MealHeader>
                <S.MealName>{meal.name}</S.MealName>
                <S.MealType>{meal.type}</S.MealType>
              </S.MealHeader>
              <S.MealContent>
                <S.SectionTitle>Ingredients</S.SectionTitle>
                <S.IngredientsList>
                  {meal.ingredients.map((ingredient, i) => (
                    <S.IngredientItem key={i}>{ingredient}</S.IngredientItem>
                  ))}
                </S.IngredientsList>
                <S.NutritionInfo>
                  <S.NutritionItem bgColor="#FFE4E1">{meal.nutrition.calories} Calories</S.NutritionItem>
                  <S.NutritionItem bgColor="#E6E6FA">{meal.nutrition.protein}g Protein</S.NutritionItem>
                  <S.NutritionItem bgColor="#E0FFF0">{meal.nutrition.carbs}g Carbs</S.NutritionItem>
                  <S.NutritionItem bgColor="#FFFACD">{meal.nutrition.fat}g Fat</S.NutritionItem>
                </S.NutritionInfo>
              </S.MealContent>
            </S.MealCard>
          ))}
        </S.MealsContainer>
        </S.ContentContainer>
      </S.PageContainer>
      <Footer />
    </div>
  );
};

export default NutritionPlan;