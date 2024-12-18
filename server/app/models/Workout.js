const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Cardio', 'Strength', 'Flexibility','Core','HIIT'],
  }, // Loại bài tập
  title: { type: String }, // Tên bài tập
  duration: { type: Number }, // Thời gian tập luyện (phút)
  intensity: { type: String, enum: ['Low', 'Medium', 'High'] }, // Độ khó
  description: { type: String }, // Mô tả bài tập
});

// Xuất thành model riêng
module.exports = mongoose.model('Workout', workoutSchema);
