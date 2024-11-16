const rateLimit = require('express-rate-limit');

// Giới hạn request chung cho toàn bộ API
exports.limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // Thời gian giới hạn: 10 phút
  max: 100, // Số lượng request tối đa cho phép trong khoảng thời gian trên
  message: "Quá nhiều yêu cầu từ địa chỉ IP này, vui lòng thử lại sau 10 phút."
});

//Giới hạn request cho các route xác thực (đăng nhập, đăng ký)
exports.limiterAuth = rateLimit({
  windowMs: 10 * 60 * 1000, // Thời gian giới hạn: 10 phút
  max: 5, // Số lượng request tối đa cho phép trong khoảng thời gian trên
  message: "Quá nhiều yêu cầu từ địa chỉ IP này, vui lòng thử lại sau 60 giây."
});