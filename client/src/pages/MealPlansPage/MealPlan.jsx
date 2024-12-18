import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as S from './MealPlanStyles';
import './MealPlan.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const MealPlanPage = () => {
  const [activeDay, setActiveDay] = useState(0); // Ngày hiện tại được chọn
  const [hoveredDay, setHoveredDay] = useState(null); // Ngày đang hover
  const [mealPlan, setMealPlan] = useState(null); // Dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  const dayListRef = useRef(null);

  // Hàm fetch dữ liệu từ API
  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        setLoading(true);

        // Lấy token từ localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please login to use this function');
        }

        const response = await axios.get('http://localhost:5000/api/meal-plans/my', {
          headers: {
            Authorization: `Bearer ${token}`, // Sử dụng token từ localStorage
          },
        });

        setMealPlan(response.data.weeklyMealPlan); // Lưu dữ liệu kế hoạch ăn uống
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  // Log kiểm tra dữ liệu
  useEffect(() => {
    console.log('Current MealPlan:', mealPlan);
    console.log('Active Day:', activeDay);
  }, [mealPlan, activeDay]);

  return (
    <div>
      <Navbar />
      <S.PageContainer>
        <S.Title>Nutrition Plan</S.Title>
        {loading ? (
          <p>Loading...</p> // Hiển thị trạng thái loading
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p> // Hiển thị lỗi
        ) : (
          <S.ContentContainer>
            <S.Sidebar>
              <S.DailyDetails>
                <S.SectionTitle>The daily details</S.SectionTitle>
                {mealPlan.week[activeDay] && (
                  <S.NutritionGrid>
                    <S.NutritionItem bgColor="#FFE4E1">
                      <span>{mealPlan.week[activeDay].totalCalories}</span>
                      <span>Calories</span>
                    </S.NutritionItem>
                    <S.NutritionItem bgColor="#E6E6FA">
                      <span>{mealPlan.week[activeDay].totalProtein}g</span>
                      <span>Protein</span>
                    </S.NutritionItem>
                    <S.NutritionItem bgColor="#E0FFF0">
                      <span>{mealPlan.week[activeDay].totalCarbs}g</span>
                      <span>Carbs</span>
                    </S.NutritionItem>
                    <S.NutritionItem bgColor="#FFFACD">
                      <span>{mealPlan.week[activeDay].totalFat}g</span>
                      <span>Fat</span>
                    </S.NutritionItem>
                  </S.NutritionGrid>
                )}
              </S.DailyDetails>
              <S.DaysOfWeek>
                <S.SectionTitle>Days of the week</S.SectionTitle>
                <S.DayList ref={dayListRef}>
                  {mealPlan.week.map((day, index) => (
                    <S.DayItem
                      key={index}
                      active={index === activeDay}
                      hovered={index === hoveredDay}
                      onClick={() => {
                        console.log(`Clicked day index: ${index}`); // Kiểm tra sự kiện click
                        setActiveDay(index);
                      }}
                      onMouseEnter={() => setHoveredDay(index)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {day.day}
                    </S.DayItem>
                  ))}
                </S.DayList>
              </S.DaysOfWeek>
            </S.Sidebar>
            <S.MealsContainer>
              {mealPlan.week[activeDay]?.meals.map((meal) => (
                <S.MealCard key={meal._id}>
                  <S.MealHeader>
                    <S.MealName>{meal.title}</S.MealName>
                    <S.MealType>{meal.type}</S.MealType>
                  </S.MealHeader>
                  <S.MealContent>
                    <S.SectionTitle>Ingredients</S.SectionTitle>
                    <S.IngredientsList>
                      {meal.ingredients.map((ingredient, idx) => (
                        <S.IngredientItem key={idx}>{ingredient}</S.IngredientItem>
                      ))}
                    </S.IngredientsList>
                    <S.NutritionInfo>
                      <S.NutritionItem bgColor="#FFE4E1">
                        {meal.calories} Calories
                      </S.NutritionItem>
                      <S.NutritionItem bgColor="#E6E6FA">
                        {meal.macros.protein}g Protein
                      </S.NutritionItem>
                      <S.NutritionItem bgColor="#E0FFF0">
                        {meal.macros.carbs}g Carbs
                      </S.NutritionItem>
                      <S.NutritionItem bgColor="#FFFACD">
                        {meal.macros.fat}g Fat
                      </S.NutritionItem>
                    </S.NutritionInfo>
                  </S.MealContent>
                </S.MealCard>
              ))}
            </S.MealsContainer>
          </S.ContentContainer>
        )}
      </S.PageContainer>
      <Footer />
    </div>
  );
};

export default MealPlanPage;
