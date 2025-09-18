import streamlit as st
import PyPDF2
import io
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

# Load environment variables
load_dotenv()

# Get Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    st.error("GEMINI_API_KEY not found! Please check your .env file.")
    st.stop()

# Streamlit page config
st.set_page_config(page_title="Medical Report Checker", page_icon="🩺", layout="centered")
st.title("AI Medical Report Checker")
st.markdown("Upload your medical report (PDF/TXT) to get a professional analysis.")

# File uploader and age input
uploaded_file = st.file_uploader("Upload your medical report", type=["pdf", "txt"])
user_age = st.text_input("Enter your age")
analyze = st.button("Analyze Report")

# Extract text from PDF
def extract_text_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    return text

# Extract text from uploaded file
def extract_text_file(uploaded_file):
    if uploaded_file.type == "application/pdf":
        return extract_text_pdf(io.BytesIO(uploaded_file.read()))
    else:
        return uploaded_file.read().decode("utf-8")

# Analyze report
if analyze:
    if not uploaded_file:
        st.error("Please upload a file first.")
        st.stop()

    if not user_age.strip():
        st.error("Please enter your age.")
        st.stop()

    try:
        # Extract content
        file_content = extract_text_file(uploaded_file)
        if not file_content.strip():
            st.error("Uploaded file is empty or invalid.")
            st.stop()

        # Prepare AI prompt
        prompt = f"""
You are a professional medical AI assistant. A user ({user_age} years old) has uploaded a medical report, specifically a blood test report. Analyze the report carefully and provide the following:

1. Verify key parameters such as hemoglobin, RBC count, WBC count, platelets, glucose levels, cholesterol, liver enzymes, kidney function indicators, and any other standard blood properties.
2. Identify any values that are outside the normal range and flag them clearly.
3. Explain in simple language what each abnormal value might indicate in terms of health.
4. Suggest follow-up tests or medical consultation if any serious abnormalities are detected.
5. Do not give unrelated advice. Keep responses concise, factual, and professional.

Respond in structured format:
- Parameter: value (normal/abnormal) – brief interpretation
- Recommendations: short actionable advice

Medical report:
{file_content}
        """

        # Initialize Gemini client
        client = ChatGoogleGenerativeAI(api_key=GEMINI_API_KEY)

        # Send prompt to Gemini model
        response = client.chat.completions.create(
            model="gemini-2.0-flash",
            messages=[
                {"role": "system", "content": "You are an expert doctor with years of experience."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        # Display the analysis
        st.text(response.choices[0].message.content)

    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
