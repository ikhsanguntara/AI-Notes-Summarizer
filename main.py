from groq import Groq
import streamlit as st
import os
import PyPDF2
from dotenv import load_dotenv

# Loading environment variables
load_dotenv()
client=Groq(
    api_key=os.getenv('GROQ_API_KEY')
)

# Function to summarize text and generate quiz questions
def summarize_text(prompt):
    try:
        response = client.chat.completions.create(
            model='openai/gpt-oss-20b',
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert educational assistant. "
                        "Your tasks are:\n"
                        "1. Summarize the provided notes in a clear and concise way.\n"
                        "2. Use easy-to-understand language suitable for students.\n"
                        "3. Present the summary in bullet points with logical flow.\n"
                        "4. Highlight key terms, formulas, or definitions clearly.\n"
                        "5. At the end, generate 3-5 multiple choice questions (MCQs) "
                        "for revision. Each MCQ should:\n"
                        "   - Have one correct answer and 3 distractors.\n"
                        "   - Be directly based on the summary.\n"
                        "   - Provide the correct answer after the options."
                    )
                },
                {
                    "role": "user",
                    "content": f"Here are the notes to process:\n\n{prompt}"
                }
            ],
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Cant Summarize at the Moment"
    
# Streamlit UI
st.set_page_config(page_title='Notes Summarizer and Quizer', page_icon=':books:',layout='wide')
st.title('Notes Summarizer and Quizer :books:')
st.write('---')

st.sidebar.header('Upload your notes 📝')
st.sidebar.write('---')
uploaded_file=st.sidebar.file_uploader('Upload a PDF file containing your notes ⬇️', type=['pdf'])

# Process the uploaded file
if uploaded_file is not None:
    with st.spinner('Processing your notes...'):
        pdf_reader = PyPDF2.PdfReader(uploaded_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        summary = summarize_text(text)
        
    st.subheader('Summary and Quiz')
    st.markdown(summary)
    
    # Download button
    st.download_button(
        label='Download Summary and Quiz',
        data=summary,
        file_name='summary_and_quiz.txt',
        mime='application/plain'
    )
