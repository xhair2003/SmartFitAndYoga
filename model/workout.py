from flask import Flask, request, jsonify
import pandas as pd
import tensorflow as tf

app = Flask(__name__)

# Load dữ liệu bài tập
workout_data_path = "workout_dataset.csv"
workout_data = pd.read_csv(workout_data_path)

# Load mô hình TensorFlow
model = tf.keras.models.load_model("workout_model.h5")  # Đường dẫn tới mô hình đã huấn luyện

# Lưu danh sách bài tập đã sử dụng
days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
used_workouts = set()

# Hàm chuyển đổi cường độ
def convert_intensity(intensity):
    if intensity == 1:
        return "low"
    elif intensity == 2:
        return "medium"
    elif intensity == 3:
        return "high"
    else:
        return "medium"  # Mặc định nếu không phải là 1, 2, 3

# Hàm chọn bài tập hàng ngày
def get_daily_workouts(predicted_duration, predicted_intensity, workout_data):
    daily_workout_plan = []
    total_duration_used = 0
    total_intensity_used = 0

    # Lọc các bài tập chưa được chọn
    available_workouts = workout_data[~workout_data["workout_title"].isin(used_workouts)]

    if available_workouts.empty:
        print("No available workouts.")
        return []

    while total_duration_used < predicted_duration and len(available_workouts) > 0:
        # Tìm bài tập phù hợp nhất
        best_match = available_workouts.iloc[(
            (available_workouts["duration"] - (predicted_duration - total_duration_used)).abs() +
            (available_workouts["intensity"] - (predicted_intensity)).abs()
        ).argsort()[:1]]

        for _, workout in best_match.iterrows():
            if workout["workout_title"] not in used_workouts:
                used_workouts.add(workout["workout_title"])
                daily_workout_plan.append({
                    "type": workout["type"],
                    "workout_title": workout["workout_title"],
                    "duration": int(workout["duration"]),
                    "intensity": convert_intensity(workout["intensity"]),
                    "description": workout["description"]
                })
                total_duration_used += workout["duration"]

        available_workouts = workout_data[~workout_data["workout_title"].isin(used_workouts)]

    if not daily_workout_plan:
        print("No workouts matched the criteria.")
    else:
        print(f"Generated workout plan: {daily_workout_plan}")

    return daily_workout_plan

@app.route('/generate-weekly-workout-plan', methods=['POST'])
def generate_weekly_workout_plan():
    try:
        # Lấy dữ liệu từ yêu cầu
        data = request.json
        age = data.get('age')
        weight = data.get('weight')
        height = data.get('height')

        # Kiểm tra và xử lý dữ liệu đầu vào
        if not isinstance(age, (int, float)):
            raise ValueError("Age must be a number.")
        if not isinstance(weight, (int, float)):
            raise ValueError("Weight must be a number.")
        if not isinstance(height, (int, float)):
            raise ValueError("Height must be a number.")

        # Chuẩn bị dữ liệu đầu vào cho mô hình (chỉ giữ lại 3 đặc trưng)
        input_data = pd.DataFrame([{
            "age": age,
            "weight": weight,
            "height": height
        }])

        # Chuyển đổi kiểu dữ liệu về float để tránh lỗi dtype
        input_data = input_data.astype(float)

        # Dự đoán thời gian và cường độ tập luyện bằng TensorFlow
        predictions = model.predict(input_data)
        predicted_duration = int(predictions[0][0])
        predicted_intensity = int(predictions[0][1])

        weekly_workout_plan = []

        for day_name in days_of_week:
            daily_workout_plan = get_daily_workouts(predicted_duration, predicted_intensity, workout_data)
            weekly_workout_plan.append({"day": day_name, "workouts": daily_workout_plan})

        return jsonify({
            "age": age,
            "weight": weight,
            "height": height,
            "weekly_workout_plan": weekly_workout_plan
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)
