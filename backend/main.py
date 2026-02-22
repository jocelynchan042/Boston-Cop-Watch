# main.py

# FastAPI entry point for the chatbot backend.
# Exposes two endpoints:
#   GET  /api/prompts - returns suggested prompts for the frontend dropdown
#   POST /api/chat    - receives user message and returns Gemini response

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot.chat import get_chat_response
from chatbot.prompts import SUGGESTED_PROMPTS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ChatRequest(BaseModel):
    message: str
    chat_history: list = []

@app.get("/api/prompts")
def get_prompts():
    return SUGGESTED_PROMPTS

@app.post("/api/chat")
def chat(request: ChatRequest):
    return get_chat_response(request.message, request.chat_history)