const { WorkoutPlans, User } = require('../models');
const sequelize = require('../config/database');

class WorkoutPlansController {
  
  // Tạo mới kế hoạch tập luyện
  static async createWorkoutPlan(req, res) {
    const { user_id, name, goal, difficulty, duration_weeks, is_active } = req.body;
    
    try {
      // Kiểm tra xem người dùng có tồn tại không
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Tạo mới kế hoạch tập luyện
      const newWorkoutPlan = await WorkoutPlans.create({
        user_id,
        name,
        goal,
        difficulty,
        duration_weeks,
        is_active
      });
      
      return res.status(201).json(newWorkoutPlan);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Lấy danh sách tất cả kế hoạch tập luyện
  static async getAllWorkoutPlans(req, res) {
    try {
      const workoutPlans = await WorkoutPlans.findAll({
        include: {
          model: User,
          attributes: ['id', 'email'],  // Lấy thông tin người dùng
        }
      });
      
      return res.status(200).json(workoutPlans);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Lấy chi tiết kế hoạch tập luyện theo ID
  static async getWorkoutPlanById(req, res) {
    const { id } = req.params;
    
    try {
      const workoutPlan = await WorkoutPlans.findByPk(id, {
        include: {
          model: User,
          attributes: ['id', 'email'],  // Lấy thông tin người dùng
        }
      });
      
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      
      return res.status(200).json(workoutPlan);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Cập nhật kế hoạch tập luyện theo ID
  static async updateWorkoutPlan(req, res) {
    const { id } = req.params;
    const { user_id, name, goal, difficulty, duration_weeks, is_active } = req.body;
    
    try {
      const workoutPlan = await WorkoutPlans.findByPk(id);
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      
      // Kiểm tra xem người dùng có tồn tại không
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Cập nhật kế hoạch tập luyện
      workoutPlan.user_id = user_id;
      workoutPlan.name = name;
      workoutPlan.goal = goal;
      workoutPlan.difficulty = difficulty;
      workoutPlan.duration_weeks = duration_weeks;
      workoutPlan.is_active = is_active;

      await workoutPlan.save();
      
      return res.status(200).json(workoutPlan);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Xóa kế hoạch tập luyện theo ID
  static async deleteWorkoutPlan(req, res) {
    const { id } = req.params;
    
    try {
      const workoutPlan = await WorkoutPlans.findByPk(id);
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      
      await workoutPlan.destroy();
      
      return res.status(200).json({ message: "Workout plan deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = WorkoutPlansController;
