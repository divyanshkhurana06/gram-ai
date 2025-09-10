#!/usr/bin/env python3
"""
GramAI Demo Script - Show APIs to Judges
Run this to demonstrate the system with a simple web interface
"""

import os
import json
import requests
from flask import Flask, render_template_string, request, jsonify, send_file
from io import BytesIO
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Configuration
DATASET_PATH = r"C:\Users\pdasv\Downloads\updated_data.csv"
ELEVEN_API_KEY = "sk_78dc8d7467f4f673cbad567018891b70f2b03acedd64517d"  # Replace with your key
HF_MODEL = "google/flan-t5-base"

# Load dataset
print("Loading dataset...")
df = pd.read_csv(DATASET_PATH, encoding="utf-8", low_memory=False)

# Clean and standardize columns
def clean_dataset(df):
    # Map your columns to standard schema
    col_mapping = {
        'scheme_name': 'Scheme',
        'name of the scheme': 'Scheme', 
        'details': 'Benefits',
        'benefits': 'Benefits',
        'eligibility': 'Eligibility',
        'application': 'Website',
        'level': 'Category',
        'schemecategory': 'Category'
    }
    
    # Normalize column names
    df.columns = [c.strip().lower().replace(' ', '_') for c in df.columns]
    
    # Apply mapping
    for old_col, new_col in col_mapping.items():
        if old_col in df.columns:
            df.rename(columns={old_col: new_col}, inplace=True)
    
    # Ensure all required columns exist
    required_cols = ['Scheme', 'Category', 'Eligibility', 'Benefits', 'Website']
    for col in required_cols:
        if col not in df.columns:
            df[col] = ""
    
    # Clean data
    for col in required_cols:
        df[col] = df[col].fillna("").astype(str).str.strip()
    
    # Remove empty schemes
    df = df[df['Scheme'].str.len() > 0].reset_index(drop=True)
    
    return df[required_cols]

df = clean_dataset(df)
print(f"Loaded {len(df)} schemes")

# Setup search
print("Setting up search...")
corpus = (df['Scheme'] + " " + df['Category'] + " " + df['Eligibility'] + " " + df['Benefits']).fillna("")
vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
tfidf_matrix = vectorizer.fit_transform(corpus)

def search_schemes(query, top_k=3):
    query_vec = vectorizer.transform([query])
    similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_indices = similarities.argsort()[::-1][:top_k]
    return df.iloc[top_indices]

# Setup LLM
print("Loading LLM...")
tokenizer = AutoTokenizer.from_pretrained(HF_MODEL)
model = AutoModelForSeq2SeqLM.from_pretrained(HF_MODEL)

def generate_summary(query, scheme_data):
    prompt = f"Explain this Indian government scheme in simple words. Query: {query}. Scheme: {scheme_data['Scheme']}. Category: {scheme_data['Category']}. Eligibility: {scheme_data['Eligibility']}. Benefits: {scheme_data['Benefits']}. Website: {scheme_data['Website']}"
    
    inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(**inputs, max_new_tokens=150, temperature=0.2)
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return summary

# TTS function
def text_to_speech(text):
    if not ELEVEN_API_KEY or ELEVEN_API_KEY == "YOUR_ELEVEN_KEY_HERE":
        return None
    
    url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM"
    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }
    data = {
        "text": text,
        "voice_settings": {"stability": 0.4, "similarity_boost": 0.7}
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            return response.content
    except:
        pass
    return None

# Flask app
app = Flask(__name__)

# HTML template for demo interface
HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>GramAI - Government Schemes Assistant</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .container { background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 10px 0; }
        input[type="text"] { width: 100%; padding: 10px; margin: 10px 0; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .result { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .scheme-name { font-size: 18px; font-weight: bold; color: #333; }
        .section { margin: 10px 0; }
        .section h4 { color: #666; margin: 5px 0; }
        audio { width: 100%; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>🏛️ GramAI - Government Schemes Assistant</h1>
    <p>Ask questions about Indian government schemes and get AI-powered explanations!</p>
    
    <div class="container">
        <h3>Ask a Question</h3>
        <input type="text" id="query" placeholder="e.g., scholarship for girls, pension for elderly, farmer loan schemes..." value="scholarship for girls in rural areas">
        <br>
        <button onclick="askQuestion()">🔍 Search Schemes</button>
        <button onclick="speakAnswer()">🔊 Generate Speech</button>
    </div>
    
    <div id="result" class="result" style="display:none;">
        <div class="scheme-name" id="scheme-name"></div>
        <div class="section">
            <h4>📋 Eligibility:</h4>
            <div id="eligibility"></div>
        </div>
        <div class="section">
            <h4>💰 Benefits:</h4>
            <div id="benefits"></div>
        </div>
        <div class="section">
            <h4>🌐 Website:</h4>
            <div id="website"></div>
        </div>
        <div class="section">
            <h4>🤖 AI Summary:</h4>
            <div id="summary"></div>
        </div>
        <audio id="audio" controls style="display:none;"></audio>
    </div>
    
    <div class="container">
        <h3>📊 Demo Examples</h3>
        <button onclick="demoQuery('scholarship for girls in rural areas')">Girls Scholarship</button>
        <button onclick="demoQuery('pension scheme for senior citizens')">Senior Citizen Pension</button>
        <button onclick="demoQuery('farmer loan subsidy schemes')">Farmer Loans</button>
        <button onclick="demoQuery('health insurance for poor families')">Health Insurance</button>
        <button onclick="demoQuery('women entrepreneurship schemes')">Women Entrepreneurship</button>
    </div>

    <script>
        function demoQuery(query) {
            document.getElementById('query').value = query;
            askQuestion();
        }
        
        function askQuestion() {
            const query = document.getElementById('query').value;
            if (!query) return;
            
            fetch('/query', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: query})
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('scheme-name').textContent = data.scheme_name || 'No scheme found';
                document.getElementById('eligibility').textContent = data.eligibility || 'Not available';
                document.getElementById('benefits').textContent = data.benefits || 'Not available';
                document.getElementById('website').textContent = data.website || 'Not available';
                document.getElementById('summary').textContent = data.summary || 'No summary available';
                document.getElementById('result').style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            });
        }
        
        function speakAnswer() {
            const summary = document.getElementById('summary').textContent;
            if (!summary || summary === 'No summary available') {
                alert('Please search for a scheme first!');
                return;
            }
            
            fetch('/speak', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text: summary})
            })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('TTS failed');
                }
            })
            .then(blob => {
                const audio = document.getElementById('audio');
                audio.src = URL.createObjectURL(blob);
                audio.style.display = 'block';
                audio.play();
            })
            .catch(error => {
                console.error('TTS Error:', error);
                alert('Text-to-Speech not available. Please check your ElevenLabs API key.');
            });
        }
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query = data.get('query', '')
    
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    
    # Search for relevant schemes
    results = search_schemes(query, top_k=1)
    
    if results.empty:
        return jsonify({
            'scheme_name': '',
            'eligibility': '',
            'benefits': '',
            'website': '',
            'summary': 'No relevant scheme found for your query.'
        })
    
    # Get best match
    best_match = results.iloc[0]
    
    # Generate AI summary
    summary = generate_summary(query, best_match)
    
    return jsonify({
        'scheme_name': best_match['Scheme'],
        'eligibility': best_match['Eligibility'],
        'benefits': best_match['Benefits'],
        'website': best_match['Website'],
        'summary': summary
    })

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    audio_data = text_to_speech(text)
    
    if audio_data:
        return send_file(BytesIO(audio_data), mimetype='audio/mpeg')
    else:
        return jsonify({'error': 'TTS not available'}), 503

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🏛️  GramAI - Government Schemes Assistant")
    print("="*60)
    print(f"📊 Loaded {len(df)} government schemes")
    print(f"🤖 Using AI model: {HF_MODEL}")
    print(f"🔊 TTS: {'Available' if ELEVEN_API_KEY != 'YOUR_ELEVEN_KEY_HERE' else 'Not configured'}")
    print("\n🌐 Starting web server...")
    print("📱 Open your browser and go to: http://localhost:5000")
    print("🎯 Try these example queries:")
    print("   • scholarship for girls in rural areas")
    print("   • pension scheme for senior citizens") 
    print("   • farmer loan subsidy schemes")
    print("   • health insurance for poor families")
    print("="*60)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
