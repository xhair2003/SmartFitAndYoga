const mongoose = require('mongoose');

const weeklyWorkoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người dùng liên kết
  week: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyWorkoutPlan', required: true }], // Tham chiếu tới DailyWorkoutPlan
  goal: { type: String, required: true }, // Mục tiêu tập luyện
  age: { type: Number, required: true }, // Tuổi của người dùng
  weight: { type: Number, required: true }, // Cân nặng
  height: { type: Number, required: true }, // Chiều cao
  gender: { type: Number, required: true }, // Giới tính
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

module.exports = mongoose.model('WeeklyWorkoutPlan', weeklyWorkoutPlanSchema);
