## GramAI Web - AI/ML Pipeline

### Setup
1. Create venv and install deps:
```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Get the dataset from Kaggle (`https://www.kaggle.com/datasets/jainamgada45/indian-government-schemes`).
   - Export the CSV locally, e.g., `data/indian_schemes.csv`.
   - Or set env var `SCHEMES_DATASET_PATH` to your CSV path.

3. (Optional) Configure LLM keys in environment:
   - `OPENAI_API_KEY` and `OPENAI_MODEL` (default `gpt-4o-mini`)
   - or `HUGGINGFACE_API_KEY` and `HF_MODEL` (default `google/flan-t5-large`)

4. (Optional) ElevenLabs TTS:
   - Set `ELEVEN_API_KEY` and optional `ELEVEN_VOICE_ID`.

### CLI Usage
```bash
python cli.py "scholarship for girls in rural areas"
```
Optional: `--dataset path/to/your.csv`

### Server (LLM + optional TTS)
```bash
python app.py
# POST http://localhost:8000/query
# {"query": "pension scheme for senior citizens"}
# POST http://localhost:8000/speak
# {"text": "Hello from GramAI"}  # or {"query": "scholarship for minorities"}
```

### What it does
- Cleans dataset into columns: `Scheme, Category, Eligibility, Benefits, Website`.
- Performs TF-IDF search over these fields to find the best match.
- Calls an LLM with both the query and dataset info to generate a simple explanation.
- Optionally converts the summary to speech with ElevenLabs.
- Returns structured JSON: `{ scheme_name, eligibility, benefits, website, summary }`.
