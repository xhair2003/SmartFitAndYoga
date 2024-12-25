from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Retrieve API key
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    raise ValueError("API key for GEMINI is not set. Please check your .env file.")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat_with_user():
    """Generate chatbot response based on user input."""
    try:
        # Get user input from the request
        user_input = request.json.get("user_input", "")
        if not user_input:
            return jsonify({"error": "User input is required."}), 400

        # Define system instruction (adjust as needed)
        system_instruction = """
        You are a helpful AI assistant. Provide clear and concise responses.
        """

        # Generative AI configuration
        generation_config = {
            "temperature": 0.7,  # Adjust for response randomness
            "top_p": 0.9,       # Probability mass for nucleus sampling
            "top_k": 40,        # Limits tokens considered at each step
            "max_output_tokens": 256,  # Limits the length of output
        }

        # Create a chat session
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
            system_instruction=system_instruction,
        )

        # Generate response
        chat_session = model.start_chat(history=[{"role": "user", "parts": [user_input]}])
        ai_response = chat_session.send_message(user_input)
        response_text = ai_response.text

        return jsonify({"response": response_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)