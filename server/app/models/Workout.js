const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Core', 'HIIT'],
    required: true, // Bắt buộc phải có loại bài tập
  }, // Loại bài tập
  title: { 
    type: String, 
    required: true, // Bắt buộc phải có tên bài tập
    trim: true, // Loại bỏ khoảng trắng thừa
  }, // Tên bài tập
  duration: { 
    type: Number, 
    required: true, // Bắt buộc phải có thời gian tập luyện
    min: 1, // Thời gian tối thiểu là 1 phút
  }, // Thời gian tập luyện (phút)
  intensity: { 
    type: Number, 
    enum: [1, 2, 3], 
    required: true, // Bắt buộc phải có độ khó
    default: 2, // Mặc định là '2' nếu không cung cấp
  }, // Độ khó
  description: { 
    type: String, 
    trim: true, 
    maxlength: 500, // Giới hạn mô tả bài tập không quá 500 ký tự
  }, // Mô tả bài tập
  createdAt: { 
    type: Date, 
    default: Date.now, // Lưu thời gian tạo bài tập
  }, // Ngày tạo bài tập
});

module.exports = mongoose.model('Workout', workoutSchema);
