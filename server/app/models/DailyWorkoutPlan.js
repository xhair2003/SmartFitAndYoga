const mongoose = require('mongoose');

const dailyWorkoutPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    required: true,
  },
  workouts: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Workout',
      required: true // Đảm bảo mỗi ngày có ít nhất một bài tập
    }
  ], // Tham chiếu tới Workout
  totalDuration: { 
    type: Number, 
    required: true,
    default: 0 // Đảm bảo giá trị mặc định
  }, // Tổng thời gian tập luyện trong ngày (phút)
  totalIntensity: { 
    type: Number, 
    enum: [1, 2, 3], // 1: Low, 2: Medium, 3: High
    required: true, 
    default: 2, // Mặc định là Medium
  }, // Độ khó tổng quát của bài tập (1: Low, 2: Medium, 3: High)
  createdAt: { 
    type: Date, 
    default: Date.now 
  }, // Thời gian tạo
});

// Xuất thành model
module.exports = mongoose.model('DailyWorkoutPlan', dailyWorkoutPlanSchema);
