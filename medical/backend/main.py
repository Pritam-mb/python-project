# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.prebuilt import create_react_agent
from langchain.tools import tool
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# CORS configuration: allow frontend to access backend
origins = [
    "http://localhost:5173",  # Vite frontend
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # allow these origins
    allow_credentials=True,
    allow_methods=["*"],         # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],         # allow all headers
)

# Request body schema
class ChatRequest(BaseModel):
    message: str

# Example tool for greetings

@tool
def say_hello(name: str) -> str:
    """Greets the user with their name and asks how to help."""
    return f"Hello {name}! How can I help you?"


# Initialize Gemini AI model
model = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.3
)

# Create ReAct agent
tools = [say_hello]
agent_executor = create_react_agent(model, tools)

# System prompt for medical assistant
system_prompt = SystemMessage(
    content=(
        "You are Arogya_Sathi, a medical AI assistant. "
        "You ONLY provide medical guidance. "
        "When user greets (like 'hi', 'hello'), call the say_hello tool. "
        "After greeting, ask them about their health problem. "
        "For medical chats: ask about symptoms, duration, and any history if necessary. "
        "Give short, clear, and important suggestions only. "
        "Always remind them to see a doctor for serious issues."
    )
)

# Root endpoint for testing
@app.get("/")
def root():
    return {"message": "Backend running ✅"}

# Chat endpoint
@app.post("/chat")
def chat(req: ChatRequest):
    # Stream agent events and collect reply
    events = agent_executor.stream(
        {"messages": [system_prompt, HumanMessage(content=req.message)]}
    )

    reply = ""
    for chunk in events:
        if "agent" in chunk and "messages" in chunk["agent"]:
            for message in chunk["agent"]["messages"]:
                reply += message.content + " "

    return {"reply": reply.strip()}
