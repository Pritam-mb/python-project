# Import necessary libraries
from langchain_google_genai import ChatGoogleGenerativeAI  # Gemini LLM
from langchain_core.messages import HumanMessage, SystemMessage  # Add SystemMessage
from langchain.tools import tool                           # For defining tools (optional)
from langgraph.prebuilt import create_react_agent          # Prebuilt agent wrapper
from dotenv import load_dotenv        
# For loading .env file
import os


# Load environment variables (API keys, etc.) from .env
load_dotenv()

@tool
def say_hello(name: str) -> str:
    """Simple greeting tool """
    print("tool has been called")
    return f"Hello {name}! how can i help you"

def main():
    # Initialize Gemini model with settings
    model = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",              # Fast & cost-efficient Gemini model
        api_key=os.getenv("GEMINI_API_KEY"),  # Load API key from environment
        temperature=0.3                        # Lower temperature = more factual
    )
        
    # No external tools for now
    tools = [say_hello]
    
    # Create a ReAct-style agent (reasoning + acting loop)
    agent_executor = create_react_agent(model, tools)
        
    print("Welcome! I am your medical AI assistant 🏥. Type 'quit' to exit.")
    
    # System / specialization prompt
    system_prompt = SystemMessage(
        content=(
            "You are Arogya_Sathi, a medical AI assistant. "
            "You ONLY provide medical guidance. "
            "When user greets (like 'hi', 'hello'), call the say_hello tool with their name if possible. "
            "After greeting, ask them about their health problem. "
            "For medical chats: ask about symptoms, duration, and any history if necessary. "
            "Give short, clear, and important suggestions only. "
            "Always remind them to see a doctor for serious issues."
        )
    )
        
    # Chat loop
    while True:
        user_input = input("\nYou: ").strip()  # Take input from user
            
        # Exit condition
        if user_input.lower() == "quit":
            print("\nArogya_Sathi: Goodbye! 👋 Stay healthy.")
            break
            
        # Print AI response
        print("\nArogya_Sathi: ", end=" ")
        
        # Stream response chunks from the agent
        for chunk in agent_executor.stream(
            {
                "messages": [
                    system_prompt,                        # Medical specialization prompt
                    HumanMessage(content=user_input)      # User message  # Send user message to agent
                ]
            }
        ):
            # if agent reply print it
            if "agent" in chunk and "messages" in chunk["agent"]:
                for message in chunk["agent"]["messages"]:
                    print(message.content, end=" ")
                    
        print()  # Add newline after complete response

# Standard Python entry point
if __name__ == "__main__":
    main()


# import os
# from dotenv import load_dotenv
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.schema import HumanMessage

# # Load API key
# load_dotenv()

# # Initialize model
# model = ChatGoogleGenerativeAI(
#     model="gemini-1.5-flash",
#     api_key=os.getenv("GEMINI_API_KEY"),
#     temperature=0.3
# )

# print("👩‍⚕️ Welcome! I am your Medical Assistant.")
# print("I will ask you questions and suggest advice. Type 'quit' anytime to exit.\n")

# while True:
#     # Step 1: Ask problem
#     problem = input("🩺 What problem are you facing? ")
#     if problem.lower() == "quit":
#         break

#     # Step 2: Ask duration
#     duration = input("⏳ How long have you had this problem? ")
#     if duration.lower() == "quit":
#         break

#     # Step 3: Ask medical history
#     history = input("📜 Do you have any relevant medical history? ")
#     if history.lower() == "quit":
#         break

#     # Step 4: Generate AI advice
#     prompt = f"""
#     You are a helpful medical assistant AI.
#     Patient problem: {problem}
#     Duration: {duration}
#     Medical history: {history}

#     Give advice, possible causes, and general remedies or medicines (if safe).
#     Do NOT replace a doctor, always suggest seeing a doctor if serious.
#     """
#     response = model.invoke([HumanMessage(content=prompt)])
#     print(response.content)


#     response = model([HumanMessage(content=prompt)])
#     print("\n💡 Suggested Advice:\n")
#     print(response.content)
#     print("\n---------------------------------\n")

