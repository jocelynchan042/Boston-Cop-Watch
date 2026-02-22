# chat.py
# Handles all communication with the Gemini API.
# Initializes the model with the system prompt from config.py,
# manages conversation history, and returns responses to main.py.

from google import genai
from google.genai import types
from chatbot.config import SYSTEM_PROMPT
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def get_chat_response(user_message: str, chat_history: list = []) -> dict:
    try:
        response = client.models.generate_content(
            model="gemini-flash-lite-latest",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT
            ),
            contents=user_message
        )
        print("RESPONSE:", response.text)
        return {
            "response": response.text,
            "status": "success"
        }
    except Exception as e:
        print("ERROR:", str(e))
        return {
            "response": "Sorry, something went wrong. Please try again.",
            "status": "error",
            "error": str(e)
        }