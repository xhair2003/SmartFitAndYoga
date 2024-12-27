from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load dữ liệu bài tập
workout_data_path = r"D:\Capstone 1\Code Bach's Branch\SmartFitAndYoga\model\workout_dataset.csv"
workout_data = pd.read_csv(workout_data_path)

# Lưu danh sách bài tập đã sử dụng
days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
used_workouts = set()

def convert_intensity(intensity):
    if intensity == 1:
        return "low"
    elif intensity == 2:
        return "medium"
    elif intensity == 3:
        return "high"
    else:
        return "medium"  # Mặc định nếu không phải là 1, 2, 3

def get_daily_workouts(predicted_duration, predicted_intensity, workout_data):
    daily_workout_plan = []
    total_duration_used = 0
    total_intensity_used = 0

    # Lọc các bài tập chưa được chọn
    available_workouts = workout_data[~workout_data["workout_title"].isin(used_workouts)]

    while total_duration_used < predicted_duration and total_intensity_used < predicted_intensity and len(available_workouts) > 0:
        best_match = available_workouts.iloc[(
            (available_workouts["duration"] - (predicted_duration - total_duration_used)).abs() +
            (available_workouts["intensity"] - (predicted_intensity - total_intensity_used)).abs()
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
                total_intensity_used += workout["intensity"]

        available_workouts = workout_data[~workout_data["workout_title"].isin(used_workouts)]

    if total_duration_used < predicted_duration or total_intensity_used < predicted_intensity:
        additional_workouts = workout_data[~workout_data["workout_title"].isin(used_workouts)]
        small_workouts = additional_workouts[additional_workouts["duration"] <= 10]

        while total_duration_used < predicted_duration and total_intensity_used < predicted_intensity and len(small_workouts) > 0:
            small_workout = small_workouts.iloc[0]
            used_workouts.add(small_workout["workout_title"])
            daily_workout_plan.append({
                "type": small_workout["type"],
                "workout_title": small_workout["workout_title"],
                "duration": int(small_workout["duration"]),
                "intensity": convert_intensity(small_workout["intensity"]),
                "description": small_workout["description"]
            })
            total_duration_used += small_workout["duration"]
            total_intensity_used += small_workout["intensity"]

            small_workouts = small_workouts[~small_workouts["workout_title"].isin(used_workouts)]

    return daily_workout_plan

@app.route('/generate-weekly-workout-plan', methods=['POST'])
def generate_weekly_workout_plan():
    try:
        # Lấy dữ liệu từ yêu cầu
        data = request.json
        age = data.get('age')
        gender = data.get('gender')
        weight = data.get('weight')
        height = data.get('height')
        goal = data.get('goal', "General Fitness")

        # Tùy chỉnh predicted_duration và predicted_intensity dựa trên mục tiêu (goal)
        if goal == "Build Muscle":
            predicted_duration = 90
            predicted_intensity = 8
        elif goal == "Lose Weight":
            predicted_duration = 60
            predicted_intensity = 7
        else:  # General Fitness
            predicted_duration = 45
            predicted_intensity = 5

        weekly_workout_plan = []

        for day_name in days_of_week:
            daily_workout_plan = get_daily_workouts(predicted_duration, predicted_intensity, workout_data)
            weekly_workout_plan.append({"day": day_name, "workouts": daily_workout_plan})

        return jsonify({
            "age": age,
            "gender": gender,
            "weight": weight,
            "height": height,
            "goal": goal,
            "weekly_workout_plan": weekly_workout_plan
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=6000, debug=True)
