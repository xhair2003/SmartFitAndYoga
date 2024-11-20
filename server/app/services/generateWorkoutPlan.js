const generateWorkoutPlan = (age, weight, goal) => {
  // Logic cơ bản để gợi ý kế hoạch tập luyện
  const workouts = [
    {
      type: 'Cardio',
      title: 'Treadmill Running',
      duration: 30, // 30 phút
      intensity: 'Medium',
      description:
        'Run on the treadmill at a steady pace to improve endurance.',
    },
    {
      type: 'Strength',
      title: 'Weight Lifting',
      duration: 45, // 45 phút
      intensity: 'High',
      description:
        'Perform compound lifts like squats and deadlifts for strength.',
    },
    {
      type: 'Flexibility',
      title: 'Yoga Session',
      duration: 20, // 20 phút
      intensity: 'Low',
      description: 'Stretch and relax with a guided yoga session.',
    },
  ];

  // Có thể tùy chỉnh logic dựa trên tuổi, cân nặng và mục tiêu
  if (goal === 'Weight Loss') {
    return workouts.filter((w) => w.type !== 'Strength'); // Tập trung vào Cardio và Flexibility
  }

  return workouts;
};

module.exports = { generateWorkoutPlan };
