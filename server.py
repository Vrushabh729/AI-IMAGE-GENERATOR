from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to connect with backend

# Set your DeepAI API key
DEEPAI_API_KEY = "YOUR_DEEPAI_API_KEY"

@app.route("/generate", methods=["POST"])
def generate_image():
    data = request.json
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        response = requests.post(
            "https://api.deepai.org/api/text2img",
            data={"text": prompt},
            headers={"api-key": DEEPAI_API_KEY}
        )
        result = response.json()
        image_url = result.get("output_url")

        if image_url:
            return jsonify({"image_url": image_url})
        else:
            return jsonify({"error": "Failed to generate image"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
